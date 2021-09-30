from flask import Flask, render_template, request, make_response
import db

app = Flask(__name__,
            static_url_path='',
            static_folder='web/assets',
            template_folder='web/templates')


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/api/sintomas', methods=['GET'])
def api_sintomas():
    return make_response(db.sintomas, 200)


@app.route('/<string:pagina>')
def error404(pagina):
    msg = f'Página ({pagina}) não existe!'
    return render_template('404.html', msg=msg)


app.run()
