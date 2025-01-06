from flask import Flask, request, send_file, jsonify, url_for
from flask_cors import CORS
import requests
import os
from flask import render_template

app = Flask(__name__)
CORS(app)

areas_dict = {
    "Construção Civil": {
        "id": "contrucao_civil",
        "image": "../static/assets/construcao_civil.png",
        "conteudo": "Na construção civil, a realidade virtual (RV) está sendo utilizada como uma ferramenta complementar de ensino, especialmente atraente para jovens inseridos no campo da informática. Um exemplo é o ambiente protótipo desenvolvido por Stange et al. (2012), que permite simular o treinamento em um canteiro de obras virtual. Os aprendizes podem praticar tarefas como a montagem de formas para pilares de concreto. Resultados de testes com RV mostraram uma melhoria significativa na identificação de riscos e na aplicação de medidas preventivas em comparação ao método de ensino tradicional, destacando a eficácia dessa tecnologia na formação profissional."
    },
    "Engenharia de Reatores": {
        "id": "reatores",
        "image": "../static/assets/engenharia_reatores.png",
        "conteudo": "Na área de engenharia de reatores, o aprendizado teórico enfrentava desafios devido à complexidade da disciplina, comprometendo a qualidade do ensino. Para resolver esse problema, foi desenvolvido um ambiente virtual utilizando tecnologias de realidade virtual para auxiliar docentes no ensino dos componentes principais de engenharia de reatores. O software SolidWorks foi utilizado para modelagem tridimensional, e a criação do ambiente virtual foi realizada com o CMS WordPress, incorporando a realidade virtual interativa por meio da ferramenta A360 Viewer da AutoDesk. Essa abordagem visa melhorar a compreensão e a aplicação prática dos conceitos."
    },
    "Indústria de Simuladores de voo": {
        "id": "voo",
        "image": "../static/assets/simulador_voo.jpg",
        "conteudo": "A realidade virtual (RV) originou-se na indústria dos simuladores de voo, que se expandiu após a Segunda Guerra Mundial com o investimento da Força Aérea Americana. O Sensorama, um dos primeiros protótipos, permitia que pilotos-alunos se familiarizassem com a cabine da aeronave, oferecendo uma experiência imersiva com visão tridimensional, aromas e vibrações. Em 1965, Ivan Sutherland desenvolveu o projeto The Ultimate Display, que permitia ao usuário explorar ambientes virtuais movendo a cabeça. Apesar das inovações na aviação, a área de simuladores de voo ainda apresenta um grande potencial a ser explorado."
    },
    "Medicina": {
        "id": "medicina",
        "image": "../static/assets/medicina.png",
        "conteudo": "As aplicações da realidade virtual (RV) estão se expandindo para diversas áreas, incluindo o treinamento de futuros médicos e enfermeiros, que enfrentam grandes desafios devido à complexidade dos procedimentos e à necessidade de interação com seres humanos. Tradicionalmente, o ensino de anatomia, fundamental para a formação desses profissionais, é realizado em laboratórios que utilizam corpos humanos e animais, modelos anatômicos, vídeos, imagens e multimídia. No entanto, esse método apresenta diversos desafios, especialmente na percepção do realismo pelos estudantes. Com o objetivo de solucionar esse problema, foi criado o projeto Virtual Interactive Distance-learning on Anatomy (VIDA), onde foram desenvolvidas interfaces interativas tridimensionais imersivas."
    },
    "Odontologia": {
        "id": "odontologia",
        "image": "../static/assets/odontologia.jpg",
        "conteudo": "Com base nos resultados obtidos do projeto VIDA e de iniciativas semelhantes, foi desenvolvido o VIDA Odonto, um protótipo de um ambiente virtual imersivo. Esse módulo utiliza interação tridimensional para o treinamento em anestesia odontológica, proporcionando maior eficácia e realismo ao aprendizado. Além disso, oferece uma avaliação automática para a precisão dos procedimentos realizados pelo estudante, permitindo a gravação para futura avaliação (TORI et al., 2018)."
    }
}


@app.route('/salvar-avatar', methods=['POST'])
def salvar_avatar():
    try:
        data = request.get_json()
        url = data.get('avatar_url')
        print(url)
        
        if not url:
            return jsonify({"error": "URL não fornecida"}), 400

        response = requests.get(url, stream=True)
        if response.status_code != 200:
            return jsonify({"error": "Não foi possível baixar o arquivo"}), 400

        filename = "avatar.glb"
        filepath = os.path.join("downloads", filename)
        os.makedirs("downloads", exist_ok=True)

        with open(filepath, 'wb') as file:
            for chunk in response.iter_content(chunk_size=1024):
                file.write(chunk)

        download_url = url_for('baixar_avatar', _external=True)
        return jsonify({"download_url": download_url})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/baixar-avatar', methods=['GET'])
def baixar_avatar():
    try:
        filename = "avatar.glb"
        filepath = os.path.join("downloads", filename)

        if not os.path.exists(filepath):
            return jsonify({"error": "Arquivo não encontrado"}), 404

        return send_file(
            filepath,
            as_attachment=True,
            download_name=filename,
            mimetype="model/gltf-binary"
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route("/")
def index():
    return render_template("index.html", areas_dict=areas_dict)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)