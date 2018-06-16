from sys import argv
from os import mkdir

filename = '__init__.py'

if __name__ == '__main__':
    if len(argv) != 2:
        print('ERROR: Invalid use of script. Correct syntax:')
        print('python3 add_blueprint.py name')
        exit()
    name = argv[1]
    my_file = open(filename, 'r')
    lines = my_file.readlines()
    my_file.close()
    index = lines.index('#ENDOFIMPORTS\n')
    import_string = 'from project.' + name + '.routes import mod\n'
    register_string = "app.register_blueprint("+name+".routes.mod, url_prefix='/"+name+"')\n"
    lines = lines[:index] + [import_string] + lines[index:] + [register_string]
    my_file = open(filename, 'w')
    my_file.write(''.join(lines))
    my_file.close()
    mkdir(name)
    mkdir(name + '/static')
    mkdir(name + '/templates')
    mkdir(name + '/templates/' + name)
    my_file = open(name+'/routes.py', 'w')
    my_file.write("from flask import Blueprint, render_template\n\nmod = Blueprint('"+name+"', __name__, template_folder='templates', static_folder='static')\n\n@mod.route('/')\ndef index():\n    return render_template('"+name+"/index.html')")
    my_file.close()
    my_file = open(name+'/templates/'+name+'/index.html', 'w')
    my_file.write('<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="utf-8">\n    <title>function_viewer</title>\n    <script src={{url_for("'+name+'.static", filename="script.js")}}></script>\n    <link rel="stylesheet" href={{url_for("'+name+'.static", filename="style.css")}}>\n  </head>\n  <body>\n    <h1>'+name+'</h1>\n  </body>\n</html>')
    my_file.close()
    my_file = open(name+'/static/script.js', 'w')
    my_file.write('console.log("loaded script.js!")')
    my_file.close()
    my_file = open(name + '/static/style.css', 'w')
    my_file.write('')
    my_file.close()
