package al.epamtest;

import lombok.Data;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class MessageController {



    @RequestMapping(value = "/message", method = RequestMethod.POST, consumes = "application/json; charset=UTF-8")
    public TheMessage addMessageToQueue(@RequestBody MessageReq c) {
        TheMessage theMessage = new TheMessage();
        theMessage.setFrom(c.getFrom());
        theMessage.setToList(c.getToList());
        theMessage.setBody(c.getBody());

       return theMessage;
    }

}

@Data
class MessageReq {
    private String from;
    private String toList;
    private String body;

}



