import os
from os.path import join, split
import json
import pdb

DIRS = ['./brands/', './regular', './solid']
OUTPUT = './icons.js'


if __name__ == '__main__':
    content = {}
    for DIR in DIRS:
        icondir = os.listdir(DIR)
        for icon in icondir:
            with open(join(DIR, icon), 'r') as f:
                line = f.read()
                filename = icon.split('.')[0]
                line = line.split('=')
                line = line[3].split('"')
                line = line[1]
                content[filename] = line

    with open(OUTPUT, 'w') as g:
        json.dump(content, g, indent=2)

    with open(OUTPUT, 'r') as h:
        data = h.read()

    with open(OUTPUT, 'w') as j:
        j.write("const iconpaths = \n" + data + "\n\n export default iconpaths;")

