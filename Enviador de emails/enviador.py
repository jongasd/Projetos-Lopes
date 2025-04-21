import smtplib
import email.message
destinatario = input("Digite o email do destinatario: ")
assunto = input("Digite o assunto do email: ")
corpo = input("Digite o corpo do email: ")
def enviar_email(destinatario, assunto, corpo):
    msg = email.message.Message()
    msg['Subject'] = assunto
    msg['From'] = 'SEU_EMAIL'
    msg['To'] = destinatario
    msg.set_content(corpo)

    smtp = smtplib.SMTP('smtp.gmail.com', 587)
    smtp.ehlo()
    smtp.starttls()
    smtp.login('SEU_EMAIL', 'SUA_SENHA')
    smtp.send_message(msg)
    smtp.quit()

    print('Email enviado com sucesso para', destinatario)

# Exemplo de uso
enviar_email('iMh9B@example.com', 'Assunto do Email', 'Corpo do Email')
