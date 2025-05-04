from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import re

app = Flask(__name__)
CORS(app)

def is_valid_email(email):
# Formato de validação de email
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/send", methods=["POST"])
def send():
    data = request.json
    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    message = data.get("message", "").strip()

    # Validação dos campos
    if not all([name, email, message]):
        return jsonify({"status": "error", "message": "Todos os campos são obrigatórios"}), 400
    
    if not is_valid_email(email):
        return jsonify({"status": "error", "message": "Email inválido"}), 400

    try:
        # Configurações do email
        sender_email = "SENDER_EMAIL"  
        receiver_email = "jogustavo.rodrigues@gmail.com"  
        app_password = "APP_PASSWORD" 

        # Criar o objeto de mensagem
        msg = MIMEMultipart()
        msg["From"] = sender_email
        msg["To"] = receiver_email
        msg["Subject"] = f"Nova Proposta de {name}"

        # Corpo do email
        body = f"""
Nova solicitação de proposta recebida:

Nome: {name}
Email: {email}
Mensagem: 

{message}
        """
        msg.attach(MIMEText(body, "plain"))

        # Envia o email
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(sender_email, app_password)
            server.send_message(msg)

        return jsonify({
            "status": "success",
            "message": "Mensagem enviada com sucesso! Entraremos em contato em breve."
        }), 200

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": "Erro ao enviar mensagem. Por favor, tente novamente mais tarde."
        }), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000, debug=True)
