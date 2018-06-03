from flask import Blueprint, render_template
from .generate import generate_text

mod = Blueprint('mickiewicz', __name__, template_folder='templates', static_folder='static')

@mod.route('/')
def index():
    generated_text = generate_text('map.json', 200)
    return render_template('mickiewicz/index.html', generated_text=generated_text)
