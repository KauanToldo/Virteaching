from flask import Flask, request, send_file, jsonify, url_for, render_template, Blueprint
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import requests
import os
import urllib
from database.db import db  # Certifique-se de que o módulo `db` está configurado corretamente

app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = True
app.config["SECRET_KEY"] = "secret"

socketio = SocketIO(app)

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

@app.route('/ver-avatar', methods=['GET'])
def ver_avatar():
    link_codificado = request.args.get('link')
    if link_codificado:
        link_decodificado = urllib.parse.unquote(link_codificado)
        return render_template('avatar.html', url=link_decodificado)

@app.route("/")
def index():
    return render_template("index.html", areas_dict=areas_dict)

main = Blueprint("main", __name__)

@main.route("/")
def blueprint_index():
    return render_template("index.html")

app.register_blueprint(main)

users = {}


@app.route('/add_account', methods=['POST'])
def add_account():
    data = request.get_json() 
    username = data.get("username")
    password = data.get("password")

    users_select = db.query('SELECT * FROM users');
    caso = True;

    if users_select == ():
        print("Primeiro usuário inserido")
        db.query("INSERT INTO users (id, nome, senha) VALUES (%s, %s, %s);",'default', username, password)
        return jsonify({"message": "usuário 1 do banco"}), 200

    else:
        for users in users_select:
            if  username ==  users.get('nome') or username == "":
                print("Usuário existente ou usuário indefinido")
                caso = False;
                return jsonify({"message": "Usuário ja existe ou indefinido"}), 400

        if caso:
            db.query("INSERT INTO users (id, nome, senha) VALUES (%s, %s, %s);",'default', username, password)
            print(f"Username: {username}, Password: {password}")
            return jsonify({"message": "Conta adicionada com sucesso!"}), 200
    

@app.route('/validate_user', methods=['POST'])
def validate_user():
    data = request.get_json()
    username = data.get("username")
    senha = data.get("senha")
    users_select = db.query('SELECT * FROM users')

    for user in users_select:
        if username == user.get("nome") and senha == user.get("senha"):
            return jsonify({"status": "success", "message": "Usuário validado com sucesso."}), 200

    return jsonify({"status": "error", "message": "Usuário ou senha inválidos."}), 400

@app.route('/process-data', methods=['POST'])
def process_data():
    data = request.get_json()
    span_value = data.get('span', '')
    text_value = data.get('text', '')

    db.query('DELETE FROM userMessage WHERE username = %s AND message = %s', span_value, text_value)

    socketio.emit('delete_message', {
        "span": span_value,
        "text": text_value
    })

    return jsonify({
        "message": "Dados recebidos com sucesso",
        "span": span_value,
        "text": text_value,
        "success": True
    })


@socketio.on("connect")
def handle_connect():
    print("Client connected!")


@socketio.on("user_join")
def handle_user_join(username, senha):

    users[request.sid] = username 

    loader = db.query('SELECT * FROM userMessage')

    if loader == ():
        emit("chato", {"message": "Seja bem-vindo", "username": "Virteaching"})
    
    for load in loader:
        message = load.get("message")
        user_from_db = load.get("username")
        emit("chato", {"message": message, "username": user_from_db, "set": username, "save": True}) 

        
@socketio.on("new_message")
def handle_new_message(message):
    print(f"New message: {message}")

    username = users.get(request.sid) 
    
    db.query('INSERT INTO userMessage (id, username, message) VALUES (%s, %s, %s);', 'default', username, message)
    emit("chato", {"message": message, "username": username, "save" : False}, broadcast=True)




if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', debug=True)