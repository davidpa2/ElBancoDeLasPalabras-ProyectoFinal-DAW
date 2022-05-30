package com.book.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.book.model.entities.Book;
import com.book.model.entities.User;
import com.book.repository.UserRepository;
import com.book.service.SendMailService;
import com.fasterxml.jackson.annotation.JsonProperty;

@CrossOrigin
@RestController
public class SendMailController {
	
	@Autowired
	private SendMailService sendMailService;
	@Autowired
	private UserRepository userRepo;

	@PostMapping("/sendMail")
	public DTO sendMail(@RequestBody DataSendmail data) {
		DTO dto = new DTO();

		User user = userRepo.getById(data.idUser);
		
		String subject = "Recuperación de contraseña";
		String message = "Su código de recuperación de contraseña es: " + user.getRecoveryKey();
		
		sendMailService.sendMail(data.mail, subject, message);
		System.out.println("Mandando mail a: " + data.mail);
		
		dto.put("key", user.getRecoveryKey());
		dto.put("estado", "correcto");	
		return dto;
	}
	
	/**
	 * Clase que contiene los datos para mandar el correo
	 */
	static class DataSendmail {
		@JsonProperty("mail")
		String mail;
		@JsonProperty("idUser")
		int idUser;

		public DataSendmail() { }
		
		public DataSendmail(String mail, int idUser) {
			super();
			this.mail = mail;
			this.idUser = idUser;
		}
	}
	
	@PostMapping("/sendBuyMail")
	public DTO sendBuyMail(@RequestBody DataReserveBookMail data) {
		DTO dto = new DTO();

		String subject = "¡Han solicitado la compra de un libro!";
		String message = "¡" + data.user.getName() + ", un usuario ha solicitado la compra de tu libro: " + data.book.getTitle() + "!";
		
		sendMailService.sendMail(data.user.getEmail(), subject, message);
		
		dto.put("estado", "correcto");	
		return dto;
	}
	
	@PostMapping("/sendExchangeMail")
	public DTO sendExchangeMail(@RequestBody DataReserveBookMail data) {
		DTO dto = new DTO();
		
		String subject = "¡Han solicitado el intercambio de un libro!";
		String message = "¡" + data.user.getName() + ", un usuario ha solicitado el intercambio de tu libro: "
				+ data.book.getTitle() + "!";
		sendMailService.sendMail(data.user.getEmail(), subject, message);
		
		dto.put("estado", "correcto");	
		return dto;
	}
	
	/**
	 * Clase que contiene los datos para mandar el correo
	 */
	static class DataReserveBookMail {
		@JsonProperty("user")
		User user;
		@JsonProperty("book")
		Book book;

		public DataReserveBookMail() { }
		
		public DataReserveBookMail(User user, Book book) {
			super();
			this.user = user;
			this.book = book;
		}
	}
	
	
}
