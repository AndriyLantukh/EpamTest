package al.epamtest;

import al.epamtest.al.epamtest.model.TheMessage;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;


@RestController
public class MessageController {

    @Autowired
    private MessageQueue messageQueue;

    @Autowired
    private ApplicationEventPublisher eventPublisher;

    @RequestMapping(value = "/message", method = RequestMethod.POST, consumes = "application/json; charset=UTF-8")
    public TheMessage addMessageToQueue(@RequestBody MessageReq c) {
        TheMessage theMessage = new TheMessage();
        theMessage.setFrom(c.getFrom());
        theMessage.setToList(c.getToList());
        theMessage.setBody(c.getBody());

        messageQueue.getMessageQ().add(theMessage.getId());
        messageQueue.getMessageMap().put(theMessage.getId(), theMessage);
        eventPublisher.publishEvent(new MessageGotEvent(theMessage.getId()));
        return theMessage;
    }

    @PostConstruct
    private void createMessage() {
        TheMessage theMessage = new TheMessage();
        theMessage.setFrom("aaa@gmail.com");
        theMessage.setToList("andriy.lantukh@gmail.com");
        theMessage.setBody("!!!!! test message");

        messageQueue.getMessageQ().add(theMessage.getId());
        messageQueue.getMessageMap().put(theMessage.getId(), theMessage);
        System.out.println("created");
    }

}

@Data
class MessageReq {
    private String from;
    private String toList;
    private String body;

}



