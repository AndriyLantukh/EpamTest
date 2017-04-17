package al.epamtest;

import al.epamtest.al.epamtest.model.TheMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by Андрей on 15.04.2017.
 */
@Component
public class MessageSender {

    private static int MAX_GMAIL_RECEPIENTS_QUANTITY = 2000;

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private MessageQueue messageQueue;

    @Autowired
    private MessageReader messageReader;

    @Async
    private void send(TheMessage message) {

        MimeMessage mail = javaMailSender.createMimeMessage();
        List<File> filesInTempFolder = new ArrayList<>();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mail, true);
            InternetAddress[] iAdressArray = InternetAddress.parse(message.getToList());
            if (iAdressArray.length > 2000) {
                System.out.println("Too many recipients. Message will send only first 2000 recipients.");
                iAdressArray = Arrays.copyOfRange(iAdressArray, 0, MAX_GMAIL_RECEPIENTS_QUANTITY - 1);
            }
            for (InternetAddress adress : iAdressArray) {
                message.getToSet().add(adress.getAddress());
            }
            helper.setBcc(iAdressArray);
            helper.setReplyTo(message.getFrom());
            helper.setFrom(message.getFrom());
            helper.setSubject(message.getSubj());
            helper.setText(message.getBody());

            if (message.getMultipartFiles() != null) {

                //TODO should remove file and work with multipartFile
                //where tomcat move uploaded files???

                File tempDir = new File(new File(".").getCanonicalPath() + "/temp/");


                for (MultipartFile multipartFile : message.getMultipartFiles()) {
                    File fileInTempFolder = new File(tempDir, multipartFile.getOriginalFilename());
                    if(fileInTempFolder.exists()) {
                        helper.addAttachment(multipartFile.getOriginalFilename(), fileInTempFolder);
                    }
                    filesInTempFolder.add(fileInTempFolder);
                }
            }

        } catch (Exception e) {
            System.out.println("Message could not create.");
            e.printStackTrace();
        } finally {
        }
        javaMailSender.send(mail);

        filesInTempFolder.stream().forEach(file -> file.delete());

        checkAndSendMessage();
    }

    @Async
    @EventListener
    public void onGotMessage(MessageGotEvent messageGotEvent) {
        System.out.println("Got message ID " + messageGotEvent.getMessageId());
        checkAndSendMessage();
    }

    private void checkAndSendMessage() {
        if (!messageQueue.getMessageQ().isEmpty()) {
            Long idFromQ = messageQueue.getMessageQ().poll();
            TheMessage messageFromQ = messageQueue.getMessageMap().get(idFromQ);
            send(messageFromQ);
            if (idFromQ % 3 == 0) {
                List<String> unreadNOtDeliveredFromInbox = messageReader.getUnreadNOtDeliveredFromInbox();
                if (unreadNOtDeliveredFromInbox.size() > 0) {
                    sendUndeliveredMessages(unreadNOtDeliveredFromInbox, idFromQ);
                }
            }
        } else {
            checkUndeliveredMessages();
        }

    }

    private void checkUndeliveredMessages() {

        List<String> unreadNOtDeliveredFromInbox = messageReader.getUnreadNOtDeliveredFromInbox();
        if (unreadNOtDeliveredFromInbox.size() > 0) {
            sendUndeliveredMessages(unreadNOtDeliveredFromInbox, TheMessage.getIdCounter() - 1);
        }
    }


    private void sendUndeliveredMessages(List<String> undeliverdAdresses, Long lastID) {
        for (String undeliveredAddress : undeliverdAdresses) {
            for (int i = 0; i < 5; i++) {
                TheMessage theMessage = messageQueue.getMessageMap().get(lastID - i);
                if (theMessage != null) {
                    if (theMessage.getToSet().contains(undeliveredAddress)) {
                        sendUndeliveredMessage(messageQueue.getMessageMap().get(lastID - i).getFrom(), undeliveredAddress);
                    }
                } else {
                    break;
                }
            }
        }
    }


    private static String UNDELIVERED_MESSAGE = "Message not delivered to";
    private static String UNDELIVERED_SUBJ = "Message not delivered";
    private static String UNDELIVERED_FROM = "testmailepam77777@gmail.com";

    private void sendUndeliveredMessage(String sender, String adress) {
        TheMessage undeliveredMessage = new TheMessage();
        undeliveredMessage.setFrom(UNDELIVERED_FROM);
        undeliveredMessage.setToList(sender);
        undeliveredMessage.setSubj(UNDELIVERED_SUBJ);
        undeliveredMessage.setBody(UNDELIVERED_MESSAGE + adress);
        send(undeliveredMessage);
    }

}
