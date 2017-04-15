package al.epamtest;

import al.epamtest.al.epamtest.model.TheMessage;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.*;

/**
 * Created by Андрей on 15.04.2017.
 */
@Data
@Component
public class MessageQueue {

    Queue<Long> messageQ = new LinkedList<Long>();

    Map<Long, TheMessage> messageMap = new HashMap<>();

    //  int first = myQ.poll();// retrieve and remove the first element



}
