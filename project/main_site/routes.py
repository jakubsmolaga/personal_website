from flask import Blueprint, render_template, redirect

mod = Blueprint('main_page', __name__, template_folder='templates')

@mod.route('/')
def index():
    return render_template('main_site/index.html')

@mod.route('/contact')
def contact():
    return render_template('main_site/contact.html')

@mod.route('/about')
def about():
    return render_template('main_site/about.html')
@mod.route('/favicon.ico')
def favicon():
    return redirect('/static/img/favicon.ico')
