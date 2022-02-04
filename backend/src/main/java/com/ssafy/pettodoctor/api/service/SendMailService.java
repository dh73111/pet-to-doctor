package com.ssafy.pettodoctor.api.service;


import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeUtility;
import java.util.Date;
import java.util.Properties;

@Service
public class SendMailService {

    final private static String myMail = "jh.javamail@gmail.com";
    final private static String password = "a789a789";

    public static void sendMail() {


        String subject = "mail Test1";
        String fromMail = "jh.javamail@gmail.com";
        String fronName = "test name";
        String toMail = "jh.javamail@gmail.com";

        StringBuffer content = new StringBuffer();
        content.append("hihi");

        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", 465);

        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.ssl.enable", "true");
        props.put("mail.smtp.ssl.trust", "smtp.gmail.com");
//        props.put("mail.smtp.atarttls.enable", "true");

        Session mailSession = Session.getDefaultInstance(props, new javax.mail.Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(myMail, password);
                }
            });

        try {
            MimeMessage message = new MimeMessage(mailSession);

            message.setFrom(new InternetAddress(fromMail, MimeUtility.encodeText(fronName, "UTF-8", "B")));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress("junh9547@gmail.com"));
            message.setSubject(subject);
//            message.setContent(content.toString(), "text/html;charset=UTF-8");
            message.setText("hihi");
            message.setSentDate(new Date());

//            Transport t = mailSession.getTransport("smtp");
//            t.connect(myMail, password);
//            t.sendMessage(message, message.getAllRecipients());
//            t.close();
            Transport.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
