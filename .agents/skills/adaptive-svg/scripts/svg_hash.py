"""Print the length and hash of an SVG file, computed the same way as the Figma snippets in references/figma.md.

Use it to check that an export copied out of a use_figma result was written to disk unchanged.
Trailing whitespace is ignored, and the hash runs over UTF-16 code units like JavaScript's charCodeAt.

Usage: python3 svg_hash.py FILE [EXPECTED_LENGTH EXPECTED_HASH]
"""

import sys


def djb2(text):
    data = text.encode('utf-16-le')
    h = 5381
    for i in range(0, len(data), 2):
        h = ((h * 33) ^ int.from_bytes(data[i:i + 2], 'little')) & 0xFFFFFFFF
    return h


def main():
    if len(sys.argv) not in (2, 4):
        sys.exit('Usage: python3 svg_hash.py FILE [EXPECTED_LENGTH EXPECTED_HASH]')
    with open(sys.argv[1], encoding='utf-8', newline='') as f:
        text = f.read().rstrip()
    length = len(text.encode('utf-16-le')) // 2
    h = djb2(text)
    print(f'length={length} hash={h}')
    if len(sys.argv) == 4 and (length, h) != (int(sys.argv[2]), int(sys.argv[3])):
        sys.exit(f'{sys.argv[1]}: expected length={sys.argv[2]} hash={sys.argv[3]}, the file differs from the Figma export')


if __name__ == '__main__':
    main()
