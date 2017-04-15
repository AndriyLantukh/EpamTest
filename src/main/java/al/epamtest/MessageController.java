package al.epamtest;

import al.epamtest.al.epamtest.model.TheMessage;
import lombok.Data;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Queue;


@RestController
public class MessageController {

    Queue<Long> messageQ = new LinkedList<Long>();

    Map<Long, TheMessage> messageMap = new HashMap<>();

  //  int first = myQ.poll();// retrieve and remove the first element


    @RequestMapping(value = "/message", method = RequestMethod.POST, consumes = "application/json; charset=UTF-8")
    public TheMessage addMessageToQueue(@RequestBody MessageReq c) {
        TheMessage theMessage = new TheMessage();
        theMessage.setFrom(c.getFrom());
        theMessage.setToList(c.getToList());
        theMessage.setBody(c.getBody());

        messageQ.add(theMessage.getId());
        messageMap.put(theMessage.getId(), theMessage);

        return theMessage;
    }

}

@Data
class MessageReq {
    private String from;
    private String toList;
    private String body;

}



