package com.ssafy.pettodoctor.api.service;


import com.ssafy.pettodoctor.api.domain.User;
import com.ssafy.pettodoctor.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeUtility;
import java.util.Date;
import java.util.Properties;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class SendMailService {

    private final UserRepository userRepository;

    final private static String myMail = "jh.javamail@gmail.com";
    final private static String password = "a789a789";

    @Transactional
    public void sendPassword(String userEmail) {

        User user = userRepository.findByEmail(userEmail);

        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 8;
        Random random = new Random();

        String generatedPassword = random.ints(leftLimit,rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

        user.setPassword(generatedPassword);

        String subject = "펫투닥터 비밀번호 재발급";
        String fromMail = "jh.javamail@gmail.com";
        String fromName = "Pet-To-Doctor";

        StringBuffer content = new StringBuffer();
        content.append("<h1>펫투닥터에서 재발급된 비밀번호입니다.</h1>\n");
        content.append("<br>");
        content.append("<h3>새 비밀번호 : ");
        content.append(user.getPassword());
        content.append("</h3>\n");
        content.append("<a href=\"http://localhost:8080/swagger-ui/index.html#/\">대충 로그인 링크</a>");

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

            message.setFrom(new InternetAddress(fromMail, MimeUtility.encodeText(fromName, "UTF-8", "B")));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(userEmail));
            message.setSubject(subject);
            message.setContent(content.toString(), "text/html;charset=UTF-8");
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
