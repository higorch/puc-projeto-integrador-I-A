from flask import Flask, render_template, request, make_response, jsonify
import db
import helpers

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


@app.route('/api/sintomas', methods=['GET'])
def api_sintomas():
    return make_response(db.symptoms, 200)


@app.route('/api/pre-diagnostico', methods=['POST'])
def api_pre_diagnostico():
    data = request.get_json(force=True)
    symptoms = data['symptoms']

    return make_response(jsonify({"response": helpers.proccessDiagnosis(symptoms)}), 200)


app.run()
