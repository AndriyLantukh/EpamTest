package al.epamtest;

import org.apache.commons.mail.util.MimeMessageParser;

import javax.mail.*;
import javax.mail.internet.MimeMessage;
import javax.mail.search.FlagTerm;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

class MessageReader {

    public Properties mailProperties;
    String host;
    String username;
    String password;

    public List<String> getUnreadNOtDeliveredFromInbox() {

        List<String> notDelivered = new ArrayList<>();

        try {

            Session session = Session.getDefaultInstance(mailProperties, null);

            Store store = session.getStore("imaps");
            store.connect(host, username, password);

            Folder inbox = store.getFolder("inbox");
            inbox.open(Folder.READ_WRITE);

            Message[] messages = inbox.search(new FlagTerm(new Flags(Flags.Flag.SEEN), false));

            System.out.println("------------------------------");
            System.out.println("Total unread Messages:- " + messages.length);

            for (Message message : messages) {
                message.setFlag(Flags.Flag.SEEN, true);
                if ("Delivery Status Notification (Failure)".equals(message.getSubject())) {
                    MimeMessageParser parser = new MimeMessageParser((MimeMessage) message);
                    parser.parse();

                    //TODO
                    // Should replace with  Gmail unique message ID.
                    // see https://javamail.java.net/nonav/docs/api/com/sun/mail/gimap/GmailMessage.html
                    // and save message to map with this ID

                    String plainContent = parser.getPlainContent();

                    Matcher m = Pattern.compile("[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+").matcher(plainContent);
                    if (m.find()) {
                        notDelivered.add(m.group());
                    }
                }
            }

            inbox.close(true);
            store.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
        return notDelivered;
    }




}