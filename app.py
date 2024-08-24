from flask import Flask
from flask import render_template

app = Flask(__name__)

areas_dict = {
    "Construção Civil": {
        "image": "construcao_civil.png",
        "conteudo": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    "Engenharia de Reatores": {
        "image": "engenharia_reatores.png",
        "conteudo": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    "Indústria de Simuladores de voo": {
        "image": "simulador_voo.png",
        "conteudo": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    "Medicina": {
        "image": "medicina.png",
        "conteudo": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    "Odontologia": {
        "image": "odontologia.png",
        "conteudo": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }
}


equips_dict = {
    "Óculos VR": {
        "image": "../static/assets/oculos.png",
        "conteudo": "Lorem Ipsum is simply dummy text of the printing and typesetting indu",
        "estado": "active"
    },
    "Mouse 3D": {
        "image": "../static/assets/mouse.png",
        "conteudo": "Lorem Ipsum is simply dummy text of the printing and typesetting indu",
        "estado": "active"
    },
    "Luvas": {
        "image": "../static/assets/luvas.png",
        "conteudo": "Lorem Ipsum is simply dummy text of the printing and typesetting indu",
        "estado": "active"
    },
    "Teclados": {
        "image": "../static/assets/oculos.png",
        "conteudo": "Lorem Ipsum is simply dummy text of the printing and typesetting indu",
        "estado": "none"
    },
    "Rastreadores": {
        "image": "../static/assets/mouse.png",
        "conteudo": "Lorem Ipsum is simply dummy text of the printing and typesetting indu",
        "estado": "none"
    },
    "Reconhecedores de Voz": {
        "image": "../static/assets/luvas.png",
        "conteudo": "Lorem Ipsum is simply dummy text of the printing and typesetting indu",
        "estado": "none"
    }
}



@app.route("/")
def index():
    return render_template("index.html", areas_dict=areas_dict, equips_dict = equips_dict)

if __name__ == '__main__':
    app.run(debug=True)