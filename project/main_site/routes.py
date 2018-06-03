from flask import Blueprint, render_template

mod = Blueprint('main_page', __name__, template_folder='templates')

@mod.route('/')
def index():
    return render_template('main_site/index.html')
