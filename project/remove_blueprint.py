from sys import argv
from shutil import rmtree

if __name__ == '__main__':
    if len(argv) != 2:
        print('ERROR: Invalid use of script. Correct syntax:')
        print('python3 remove_blueprint.py name')
        exit()
    name = argv[1]
    rmtree(name)
    my_file = open('__init__.py', 'r')
    lines = my_file.readlines()
    my_file.close()
    for i,line in enumerate(lines):
        if name in line:
            lines.pop(i)
    my_file = open('__init__.py', 'w')
    my_file.write(''.join(lines))
    my_file.close()
