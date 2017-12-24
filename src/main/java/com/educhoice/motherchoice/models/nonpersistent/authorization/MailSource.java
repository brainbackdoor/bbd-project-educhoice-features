package com.educhoice.motherchoice.models.nonpersistent.authorization;

import org.springframework.beans.factory.annotation.Value;

import lombok.Getter;


@Getter
public class MailSource {

	@Value("${property.sender}")
	private String sender;

	@Value("${property.sender_password}")
	private String sender_password;

	@Value("${property.sender_url}")
	private String sender_url;

	private String domainForToken;


	public MailSource() {
	}
	
	public MailSource(String sender, String sender_password, String sender_url) {
		this.sender = sender;
		this.sender_password = sender_password;
		this.sender_url = sender_url;
		this.domainForToken = sender_url + "/api/token";
	}
}
