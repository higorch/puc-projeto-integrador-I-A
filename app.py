from flask import Flask, render_template, request

app = Flask(__name__,
            static_url_path='',
            static_folder='web/assets',
            template_folder='web/templates')


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/<string:pagina>')
def error404(pagina):
    msg = f'Página ({pagina}) não existe!'
    return render_template('404.html', msg=msg)


app.run()
