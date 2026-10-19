"""Prints the frame index the page's decoder reads for a hero video (JSON).

    python3 tools/hero-index.py media/hero/hero-desktop.mp4 > media/hero/hero-desktop.json

The index gives each frame's byte range in the MP4 (in decode order, which
is also display order since the videos have no B-frames), which frames are
keyframes, and the decoder setup data (the avcC box), so the page can feed
frames to a VideoDecoder straight from the downloaded file with no demuxer.
"""
import base64
import json
import os
import struct
import subprocess
import sys

CONTAINERS = {b'moov', b'trak', b'mdia', b'minf', b'stbl'}


def find_avcc(data, start=0, end=None):
    end = len(data) if end is None else end
    pos = start
    while pos + 8 <= end:
        size, kind = struct.unpack('>I4s', data[pos:pos + 8])
        header = 8
        if size == 1:
            size = struct.unpack('>Q', data[pos + 8:pos + 16])[0]
            header = 16
        if size < header:
            break
        if kind in CONTAINERS:
            found = find_avcc(data, pos + header, pos + size)
            if found:
                return found
        elif kind == b'stsd':
            # stsd: version/flags (4), entry count (4), then sample entries.
            entry = pos + header + 8
            # avc1 sample entry: 8-byte box header + 78 bytes of fields, then child boxes.
            return find_avcc(data, entry + 8 + 78, entry + struct.unpack('>I', data[entry:entry + 4])[0])
        elif kind == b'avcC':
            return data[pos + header:pos + size]
        pos += size
    return None


def main(path):
    data = open(path, 'rb').read()
    avcc = find_avcc(data)
    if not avcc:
        sys.exit('no avcC box in ' + path)
    codec = 'avc1.%02x%02x%02x' % (avcc[1], avcc[2], avcc[3])
    probe = json.loads(subprocess.check_output([
        'ffprobe', '-v', 'error', '-select_streams', 'v', '-show_entries',
        'stream=width,height,r_frame_rate:packet=pos,size,flags,pts', '-of', 'json', path]))
    stream = probe['streams'][0]
    num, den = (int(x) for x in stream['r_frame_rate'].split('/'))
    packets = probe['packets']
    pts = [int(p['pts']) for p in packets]
    if pts != sorted(pts):
        sys.exit('frames are not in display order (B-frames?) in ' + path)
    keys = [i for i, p in enumerate(packets) if 'K' in p['flags']]
    if keys[0] != 0:
        sys.exit('first frame is not a keyframe in ' + path)
    print(json.dumps({
        'src': path,
        'codec': codec,
        'width': stream['width'],
        'height': stream['height'],
        'fps': num / den,
        'bytes': os.path.getsize(path),
        'description': base64.b64encode(avcc).decode(),
        'keys': keys,
        'frames': [[int(p['pos']), int(p['size'])] for p in packets],
    }, separators=(',', ':')))


if __name__ == '__main__':
    main(sys.argv[1])
