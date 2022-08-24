package org.demo.backend.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

/* https://www.baeldung.com/registration-verify-user-by-email */
@Slf4j
@Component
@EnableAsync
public class MailSenderListener implements ApplicationListener<OnMailSenderCompleteEvent> {

    @Autowired
    private JavaMailSender mailSender;
    
    @Value("${spring.mail.username}")
    private String fromEmail;
    
	@Override
	public void onApplicationEvent(OnMailSenderCompleteEvent event) {
		try {
			SimpleMailMessage email = new SimpleMailMessage();
			email.setFrom(fromEmail);
			email.setTo( event.getAccount().getEmail() );
	        email.setSubject("Backend application");
	        email.setText( event.getTextMessage() );
	        mailSender.send(email);
	        log.info("Email sended success");
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
		}
	}
}
