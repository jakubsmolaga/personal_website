from flask import Flask

app = Flask(__name__)

from project.mickiewicz.routes import mod
from project.kosa_vs_harmasz.routes import mod
from project.tictactoe.routes import mod
from project.main_site.routes import mod
from project.xor.routes import mod
from project.lsystemy.routes import mod
from project.fraktale.routes import mod
#ENDOFIMPORTS

app.register_blueprint(mickiewicz.routes.mod, url_prefix='/mickiewicz')
app.register_blueprint(kosa_vs_harmasz.routes.mod, url_prefix='/kosa_vs_harmasz')
app.register_blueprint(tictactoe.routes.mod, url_prefix='/tictactoe')
app.register_blueprint(main_site.routes.mod)
app.register_blueprint(xor.routes.mod, url_prefix='/xor')
app.register_blueprint(lsystemy.routes.mod, url_prefix='/lsystemy')
app.register_blueprint(fraktale.routes.mod, url_prefix='/fraktale')
