package al.epamtest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class MailDeliveryApplication {

	public static void main(String[] args) {
		SpringApplication.run(MailDeliveryApplication.class, args);
	}
}
