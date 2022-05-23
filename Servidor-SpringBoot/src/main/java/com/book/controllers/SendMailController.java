package com.book.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.book.service.SendMailService;
import com.fasterxml.jackson.annotation.JsonProperty;

@CrossOrigin
@RestController
public class SendMailController {
	
	@Autowired
	private SendMailService sendMailService;

	@PostMapping("/sendMail")
	public DTO sendMail(@RequestBody DataSendmail data) {
		DTO dto = new DTO();
		
		String subject = "Recuperación de contraseña";
		String message = "Hola!";
		
		sendMailService.sendMail(data.mail, subject, message);
		System.out.println("Mandando mail a: " + data.mail);
		dto.put("estado", "correcto");
		
		return dto;
	}
	
	/**
	 * Clase que contiene los datos para mandar el correo
	 */
	static class DataSendmail {
		@JsonProperty("mail")
		String mail;

		public DataSendmail() { }
		
		public DataSendmail(String mail) {
			super();
			this.mail = mail;
		}
	}
}
