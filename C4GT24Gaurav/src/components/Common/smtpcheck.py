import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def check_smtp(smtp_server, smtp_port, smtp_user, smtp_password, sender_email, receiver_email):
    # Create a secure SSL context
    context = ssl.create_default_context()
    
    try:
        # Create the email
        message = MIMEMultipart("alternative")
        message["Subject"] = "SMTP Test"
        message["From"] = sender_email
        message["To"] = receiver_email
        
        text = "This is a test email to check SMTP settings."
        part1 = MIMEText(text, "plain")
        
        message.attach(part1)
        
        # Connect to the server and send the email
        with smtplib.SMTP_SSL(smtp_server, smtp_port, context=context) as server:
            server.login(smtp_user, smtp_password)
            server.sendmail(sender_email, receiver_email, message.as_string())
        
        print("Email sent successfully!")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    smtp_server = "smtp.gmail.com"  # Replace with your SMTP server
    smtp_port = 465  # Replace with your SMTP port
    smtp_user = "gaurav05082002@gmail.com"  # Replace with your email
    smtp_password = "pqtmecexssleehyq"  # Replace with your email password
    sender_email = "gaurav05082002@gmail.com"  # Replace with your email
    receiver_email = "gaurav05082002@gmail.com"  # Replace with the recipient email
    
    check_smtp(smtp_server, smtp_port, smtp_user, smtp_password, sender_email, receiver_email)
