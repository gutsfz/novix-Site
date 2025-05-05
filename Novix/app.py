from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import smtplib
import os
import re

# Carrega as variáveis do .env
load_dotenv()

app = Flask(__name__)
CORS(app)

def is_valid_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

@app.route('/')
def home():
    return render_template('index.html')

@app.route("/send", methods=["POST"])
def send():
    data = request.json
    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    message = data.get("message", "").strip()

    if not all([name, email, message]):
        return jsonify({"status": "error", "message": "Todos os campos são obrigatórios"}), 400
    
    if not is_valid_email(email):
        return jsonify({"status": "error", "message": "Email inválido"}), 400

    try:
        # Pegando dados do .env
        sender_email = os.getenv("EMAIL_SENDER")
        receiver_email = os.getenv("EMAIL_RECEIVER")
        app_password = os.getenv("EMAIL_PASSWORD")

        if not all([sender_email, receiver_email, app_password]):
            return jsonify({"status": "error", "message": "Erro de configuração do servidor"}), 500

        msg = MIMEMultipart()
        msg["From"] = sender_email
        msg["To"] = receiver_email
        msg["Subject"] = f"Nova Proposta de {name}"

        body = f"""
Nova solicitação de proposta recebida:

Nome: {name}
Email: {email}
Mensagem:

{message}
        """
        msg.attach(MIMEText(body, "plain"))

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