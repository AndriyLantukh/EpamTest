package al.epamtest;

import al.epamtest.al.epamtest.model.TheMessage;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.List;

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
        theMessage.setSubj(c.getSubj());
        theMessage.setBody(c.getBodyText());

        messageQueue.getMessageQ().add(theMessage.getId());
        messageQueue.getMessageMap().put(theMessage.getId(), theMessage);
        eventPublisher.publishEvent(new MessageGotEvent(theMessage.getId()));

        return theMessage;
    }

    @RequestMapping(value = "/messagemultipart", method = {RequestMethod.POST})
    public String addEditLocationToCompany(Model model
            , @RequestParam("from") String from
            , @RequestParam("toList") String toList
            , @RequestParam("subj") String subj
            , @RequestParam("bodyText") String bodyText
            , @RequestParam(value = "includeFiles", required = false) List<MultipartFile> includeFiles) {

        TheMessage theMessage = new TheMessage();
        theMessage.setFrom(from);
        theMessage.setToList(toList);
        theMessage.setSubj(subj);
        theMessage.setBody(bodyText);
        if (includeFiles != null) {
            try {
                File tempDir = new File(new File(".").getCanonicalPath() + "/temp/");
                if (!tempDir.exists()) {
                    tempDir.mkdir();
                }

                for (MultipartFile includeFile : includeFiles) {
                    File file = new File(tempDir, includeFile.getOriginalFilename());
                    InputStream input = includeFile.getInputStream();
                    Files.copy(input, file.toPath());
                    input.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            theMessage.setMultipartFiles(includeFiles);
        }

        messageQueue.getMessageQ().add(theMessage.getId());
        messageQueue.getMessageMap().put(theMessage.getId(), theMessage);
        eventPublisher.publishEvent(new MessageGotEvent(theMessage.getId()));

        return theMessage.getId().toString();
    }

//    @PostConstruct
//    private void createMessage() {
//        TheMessage theMessage = new TheMessage();
//        theMessage.setFrom("aaa@gmail.com");
//        theMessage.setToList("andriy.lantukh@gmail.com");
//        theMessage.setBody("!!!!! test message");
//
//        messageQueue.getMessageQ().add(theMessage.getId());
//        messageQueue.getMessageMap().put(theMessage.getId(), theMessage);
//        System.out.println("created");
//    }

}

@Data
class MessageReq {
    private String from;
    private String toList;
    private String subj;
    private String bodyText;

}



