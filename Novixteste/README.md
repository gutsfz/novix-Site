# Novix - Formulário de Contato

Este é o sistema de formulário de contato da Novix, que envia as mensagens para o email jogustavo.rodrigues@gmail.com.

## Configuração do Email

Para que o formulário funcione corretamente, você precisa configurar as credenciais do Gmail que será usado para enviar os emails. Siga os passos abaixo:

1. **Habilitar Verificação em Duas Etapas**:
   - Acesse sua conta do Google
   - Vá em "Segurança"
   - Ative a "Verificação em duas etapas" se ainda não estiver ativada

2. **Criar Senha de App**:
   - Acesse sua conta do Google
   - Vá em "Segurança"
   - Em "Verificação em duas etapas", clique em "Senhas de app"
   - Selecione "Email" para o app e "Outro" para o dispositivo
   - Clique em "Gerar"
   - O Google fornecerá uma senha de 16 caracteres

3. **Configurar o Arquivo app.py**:
   - Abra o arquivo `app.py`
   - Localize as variáveis de configuração de email:
     ```python
     sender_email = "SENDER_EMAIL"  # Substitua pelo seu Gmail
     app_password = "APP_PASSWORD"  # Substitua pela senha de app gerada
     ```
   - Substitua `SENDER_EMAIL` pelo seu endereço Gmail
   - Substitua `APP_PASSWORD` pela senha de 16 caracteres gerada no passo anterior

## Executando o Projeto

1. Instale as dependências:
   ```bash
   pip install flask flask-cors
   ```

2. Execute o servidor:
   ```bash
   python app.py
   ```

3. Acesse o site:
   - Abra o navegador
   - Acesse `http://localhost:8000`

## Testando o Formulário

1. Preencha os campos obrigatórios:
   - Nome
   - E-mail
   - Mensagem

2. Clique em "Enviar Mensagem"

3. Você receberá uma confirmação quando a mensagem for enviada com sucesso.

## Observações

- O formulário possui validação de campos obrigatórios
- O campo de email é validado para garantir um formato válido
- As mensagens são enviadas para jogustavo.rodrigues@gmail.com
- Em caso de erro, uma mensagem apropriada será exibida ao usuário
