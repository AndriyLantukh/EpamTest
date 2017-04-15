package al.epamtest;

import al.epamtest.al.epamtest.model.TheMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

/**
 * Created by Андрей on 15.04.2017.
 */
@Component
public class MessageSender {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private MessageQueue messageQueue;

    private void send(TheMessage message) {
        MimeMessage mail = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mail, true);
            helper.setTo(message.getToList());
            helper.setReplyTo(message.getFrom());
            helper.setFrom(message.getFrom());
            helper.setSubject("Test " + message.getId());
            helper.setText(message.getBody());
        } catch (MessagingException e) {
            e.printStackTrace();
        } finally {}
        javaMailSender.send(mail);
        //return helper;
    }

    @EventListener
    public void onGotMessage(MessageGotEvent messageGotEvent) {
        System.out.println("Got message ID " + messageGotEvent.getMessageId());
        if(!messageQueue.getMessageQ().isEmpty()) {
            Long idFromQ = messageQueue.getMessageQ().poll();
            TheMessage messageFromQ = messageQueue.getMessageMap().get(idFromQ);

            send(messageFromQ);
        }
    }


}
