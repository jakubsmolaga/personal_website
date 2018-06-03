from flask import Blueprint, render_template

mod = Blueprint('kosa_vs_harmasz', __name__, template_folder='templates', static_folder='static')

@mod.route('/')
def index():
    return render_template('kosa_vs_harmasz/index.html')
