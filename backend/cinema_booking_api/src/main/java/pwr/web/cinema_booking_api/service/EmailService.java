package pwr.web.cinema_booking_api.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.util.ByteArrayDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import pwr.web.cinema_booking_api.entity.User;

import java.io.IOException;
import java.io.InputStream;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;

    @Autowired
    public EmailService(JavaMailSender javaMailSender, TemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }

    private String generateEmailHtml(User user) {
        Context context = new Context();
        context.setVariable("fullName", user.getFullName());

        return templateEngine.process("mail", context);
    }

    @Async
    public void sendConfirmationToCustomer(User user, InputStream pdf) throws MessagingException, IOException {
        MimeMessage simpleMailMessage = javaMailSender.createMimeMessage();
        String html = generateEmailHtml(user);
        simpleMailMessage.setSubject("Reservation");
        MimeMessageHelper helper;
        helper = new MimeMessageHelper(simpleMailMessage, true);
        helper.setTo(user.getEmail());
        helper.setText(html, true);
        var byteArrayDataSource = new ByteArrayDataSource(pdf, "application/pdf");
        helper.addAttachment(byteArrayDataSource.getName(), byteArrayDataSource);
        javaMailSender.send(simpleMailMessage);
    }
}