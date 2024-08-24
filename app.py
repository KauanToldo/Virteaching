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
        "conteudo": "Os óculos 3D criam profundidade ao projetar imagens diferentes para cada olho, aprimorando a imersão visual.",
        "estado": "active",
        "controle": 1,
    },
    "Mouse 3D": {
        "image": "../static/assets/mouse.png",
        "conteudo": "Os mouses 3D oferecem controle preciso em ambientes virtuais, permitindo movimentos em todas as direções.",
        "estado": "active",
        "controle": 2,
    },
    "Luvas": {
        "image": "../static/assets/luvas.png",
        "conteudo": "As luvas 3D capturam movimentos manuais, permitindo interação natural e precisa com ambientes virtuais.",
        "estado": "active",
        "controle": 3,
    },
    "Teclados": {
        "image": "../static/assets/oculos.png",
        "conteudo": "Permitem entrada de comandos e dados para interação com sistemas virtuais, similar a um ambiente tradicional.",
        "estado": "none",
        "controle": 4,
    },
    "Rastreadores": {
        "image": "../static/assets/mouse.png",
        "conteudo": "Monitoram e registram o movimento do usuário, integrando-o com o ambiente virtual para uma experiência mais dinâmica.",
        "estado": "none",
        "controle": 5,
    },
    "Reconhecedores de Voz": {
        "image": "../static/assets/luvas.png",
        "conteudo": "Capturam comandos de voz, possibilitando controle por meio de comandos falados.",
        "estado": "none",
        "controle": 6,
    },
    "Displays visuais": {
        "image": "../static/assets/luvas.png",
        "conteudo": "Oferecem uma experiência visual imersiva.",
        "estado": "none",
        "controle": 7,
    },
    "Displays de áudio": {
        "image": "../static/assets/luvas.png",
        "conteudo": "Proporcionam um som espacial envolvente.",
        "estado": "none",
        "controle": 8,
    },
    "Displays hápticos": {
        "image": "../static/assets/luvas.png",
        "conteudo": "Simulam sensações táteis, adicionando uma dimensão extra à interação.",
        "estado": "none",
        "controle": 9,
    }
}



@app.route("/")
def index():
    return render_template("index.html", areas_dict=areas_dict, equips_dict = equips_dict)

if __name__ == '__main__':
    app.run(debug=True)