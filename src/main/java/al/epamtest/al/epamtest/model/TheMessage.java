package al.epamtest.al.epamtest.model;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by Андрей on 15.04.2017.
 */

@Data
public class TheMessage {

    private static Long idCounter = 0L;

    public static Long getIdCounter(){
        return idCounter;
    }

    public TheMessage() {
        id = idCounter++;
    }

    private Long id;

    private String from;
    private String toList;
    private Set<String> toSet = new HashSet<>();
    private String subj;
    private String body;
    private String answer;
    private List<MultipartFile> multipartFiles;

}
