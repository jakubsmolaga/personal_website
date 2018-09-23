from flask import Blueprint, render_template

mod = Blueprint('lsystemy', __name__, template_folder='templates', static_folder='static')

@mod.route('/')
def index():
    return render_template('lsystemy/index.html')