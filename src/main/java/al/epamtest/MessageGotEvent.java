package al.epamtest;

/**
 * Created by Андрей on 15.04.2017.
 */
public class MessageGotEvent{

    private Long messageId;

    public Long getMessageId() {
        return messageId;
    }

    MessageGotEvent(Long id){
        this.messageId = id;
    }

}


