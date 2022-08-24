package org.demo.backend.event;

import org.demo.backend.model.Account;
import org.springframework.context.ApplicationEvent;

import lombok.Getter;

public class OnMailSenderCompleteEvent extends ApplicationEvent {

	private static final long serialVersionUID = 1L;

	@Getter
	private Account account;
	
	@Getter
	private String textMessage;
	
	public OnMailSenderCompleteEvent(Account account, String textMessage) {
		super(account);
		this.account = account;
		this.textMessage = textMessage;
	}

}
