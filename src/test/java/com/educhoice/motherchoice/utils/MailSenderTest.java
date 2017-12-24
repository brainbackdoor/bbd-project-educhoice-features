package com.educhoice.motherchoice.utils;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.junit4.SpringRunner;

import com.educhoice.motherchoice.models.nonpersistent.authorization.MailSource;
import com.educhoice.motherchoice.models.nonpersistent.authorization.Token;

import io.restassured.RestAssured;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class MailSenderTest {

	private static final Logger log = LoggerFactory.getLogger(MailSenderTest.class);

	private Token token;
	
    @Autowired
    RandomStringUtils randomStringUtils;
	
	@Value("${local.server.port}")
	private int serverPort;
	
	String RECEIVER_MAIL_ADDRESS = "edusquadtest@gmail.com";

	@Value("${property.sender}")
	public String MAIL_SENDER;

	@Value("${property.sender_password}")
	public String MAIL_SENDER_PASSWORD;

	@Value("${property.sender_url}")
	public String DOMAIN;

	@Before
	public void setup() {
		RestAssured.port = serverPort;
		
        Token setupToken = new Token();
        setupToken.setEmail(RECEIVER_MAIL_ADDRESS);
        setupToken.setTokenValue(randomStringUtils.generateRandomString(20));
        this.token = setupToken;
	}

	@Test
	public void mailSendTest() {
		MailSource ms = new MailSource(MAIL_SENDER, MAIL_SENDER_PASSWORD, DOMAIN);
		log.debug("receiver mail address : {}",RECEIVER_MAIL_ADDRESS);
		MailSender joinAuthMail = new MailSender(RECEIVER_MAIL_ADDRESS, ms);
		joinAuthMail.sendMailForToken(token);
	}

}