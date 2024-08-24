from flask import Flask
from flask import render_template

app = Flask(__name__)

areas_dict = {
    "Construção Civil": {
        "id": "contrucao_civil",
        "image": "../static/assets/construcao_civil.png",
        "conteudo": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    "Engenharia de Reatores": {
        "id": "reatores",
        "image": "../static/assets/engenharia_reatores.png",
        "conteudo": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    "Indústria de Simuladores de voo": {
        "id": "voo",
        "image": "../static/assets/simulador_voo.png",
        "conteudo": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    "Medicina": {
        "id": "medicina",
        "image": "../static/assets/medicina.png",
        "conteudo": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    "Odontologia": {
        "id": "odontologia",
        "image": "../static/assets/odontologia.png",
        "conteudo": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }
}


@app.route("/")
def index():
    return render_template("index.html", areas_dict=areas_dict)

if __name__ == '__main__':
    app.run(debug=True)