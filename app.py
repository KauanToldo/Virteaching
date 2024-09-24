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
        "image": "../static/assets/simulador_voo.jpg",
        "conteudo": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    "Medicina": {
        "id": "medicina",
        "image": "../static/assets/medicina.png",
        "conteudo": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    "Odontologia": {
        "id": "odontologia",
        "image": "../static/assets/odontologia.jpg",
        "conteudo": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }
}


equips_dict = {
    "Óculos VR": {
        "image": "../static/assets/oculos.png",
        "conteudo": "Os óculos 3D criam profundidade ao projetar imagens diferentes para cada olho, aprimorando a imersão visual.",
        "estado": "active",
    },
    "Mouse 3D": {
        "image": "../static/assets/mouse.png",
        "conteudo": "Os mouses 3D oferecem controle preciso em ambientes virtuais, permitindo movimentos em todas as direções.",
        "estado": "active",
    },
    "Luvas": {
        "image": "../static/assets/luvas.png",
        "conteudo": "As luvas 3D capturam movimentos manuais, permitindo interação natural e precisa com ambientes virtuais.",
        "estado": "active",
    },
    "Teclados": {
        "image": "../static/assets/oculos.png",
        "conteudo": "Permitem entrada de comandos e dados para interação com sistemas virtuais, similar a um ambiente tradicional.",
        "estado": "active",
    },
    "Rastreadores": {
        "image": "../static/assets/mouse.png",
        "conteudo": "Monitoram e registram o movimento do usuário, integrando-o com o ambiente virtual para uma experiência mais dinâmica.",
        "estado": "active",

    },
    "Reconhecedores de Voz": {
        "image": "../static/assets/luvas.png",
        "conteudo": "Capturam comandos de voz, possibilitando controle por meio de comandos falados.",
        "estado": "active",
    },
    "Displays visuais": {
        "image": "../static/assets/luvas.png",
        "conteudo": "Oferecem uma experiência visual imersiva.",
        "estado": "active",
    },
    "Displays de áudio": {
        "image": "../static/assets/luvas.png",
        "conteudo": "Proporcionam um som espacial envolvente.",
        "estado": "active",
    },
    "Displays hápticos": {
        "image": "../static/assets/luvas.png",
        "conteudo": "Simulam sensações táteis, adicionando uma dimensão extra à interação.",
        "estado": "active",
    }
}



@app.route("/")
def index():
    return render_template("index.html", areas_dict=areas_dict, equips_dict = equips_dict)

if __name__ == '__main__':
    app.run(debug=True)