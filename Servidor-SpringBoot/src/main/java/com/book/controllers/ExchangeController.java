package com.book.controllers;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.book.model.entities.Book;
import com.book.model.entities.Exchange;
import com.book.model.entities.User;
import com.book.repository.BookRepository;
import com.book.repository.ExchangeRepository;
import com.book.repository.UserRepository;
import com.book.service.SendMailService;
import com.fasterxml.jackson.annotation.JsonProperty;

@CrossOrigin
@RestController
public class ExchangeController {

	@Autowired
	ExchangeRepository exchangeRepo;
	@Autowired
	BookRepository bookRepo;
	@Autowired
	UserRepository userRepo;
	@Autowired
	SendMailService sendMailService;

	@PostMapping("/reserveExchangeBook")
	public DTO reserveExchangeBook(@RequestBody DataExchange data) {
		DTO dto = new DTO();
		dto.put("estado", "error");

		Exchange exchange = new Exchange();
		exchange.setBookP(data.bookP);
		exchange.setUserP(data.petitioner);
		exchange.setIdBookO(data.bookO.getId());
		exchange.setIdUserO(data.owner.getId());

		Book bookP = bookRepo.getById(data.bookP.getId());
		bookP.setReserved(1);
		bookRepo.save(bookP);
		Book bookO = bookRepo.getById(data.bookO.getId());
		bookO.setReserved(1);
		bookRepo.save(bookO);

		exchangeRepo.save(exchange);

		String subject = "¡Han solicitado el intercambio de un libro!";
		String message = "¡" + data.owner.getName() + ", un usuario ha solicitado el intercambio de tu libro: "
				+ data.bookO.getTitle() + "!";
		sendMailService.sendMail(data.owner.getEmail(), subject, message);

		dto.put("estado", "correcto");

		return dto;
	}

	/**
	 * Clase que contiene los datos de registro del usuario
	 */
	static class DataExchange {
		@JsonProperty("bookP")
		Book bookP;
		@JsonProperty("petitioner")
		User petitioner;
		@JsonProperty("bookO")
		Book bookO;
		@JsonProperty("owner")
		User owner;

		public DataExchange(Book bookP, User petitioner, Book bookO, User owner) {
			super();
			this.bookP = bookP;
			this.petitioner = petitioner;
			this.bookO = bookO;
			this.owner = owner;
		}
	}

	@GetMapping("/getExchangeReservedBooks/{id}")
	public DTO getBuyReservedBooks(@PathVariable(value = "id") int id) {
		DTO dto = new DTO();
		dto.put("estado", "error");

		List<Exchange> exchangeList = new ArrayList<Exchange>();

		exchangeList = exchangeRepo.getExchangeReservedBooks(id);

		// Guardar en una lista los dueños de cada libro en el mismo orden
		List<User> userPList = new ArrayList<User>();
		List<Book> bookPList = new ArrayList<Book>();
		List<Book> bookOList = new ArrayList<Book>();

		for (Exchange e : exchangeList) {
			userPList.add(userRepo.getById(e.getUserP().getId()));
			bookPList.add(bookRepo.getById(e.getBookP().getId()));
			bookOList.add(bookRepo.getById(e.getIdBookO()));
		}

		dto.put("usersP", userPList);
		dto.put("booksP", bookPList);
		dto.put("booksO", bookOList);
		dto.put("estado", "correcto");

		return dto;
	}

	@PostMapping("/exchangeBooks")
	public DTO exchangeBooks(@RequestBody DataExchange data) {
		DTO dto = new DTO();
		dto.put("estado", "error");

		Exchange exchange = exchangeRepo.exchangeBooks(data.petitioner.getId(), data.bookP.getId(), data.owner.getId(),
				data.bookO.getId());

		Date currentDate = new Date();
		exchange.setDate(new SimpleDateFormat("dd-MM-yyyy").format(currentDate));

		Book bookP = bookRepo.getById(data.bookP.getId());
		bookP.setReserved(-1);
		bookRepo.save(bookP);
		Book bookO = bookRepo.getById(data.bookO.getId());
		bookO.setReserved(-1);
		bookRepo.save(bookO);

		exchangeRepo.save(exchange);

		dto.put("estado", "correcto");

		return dto;
	}

	@PostMapping("/cancelExchangeBooks")
	public DTO cancelExchangeBooks(@RequestBody DataExchange data) {
		DTO dto = new DTO();
		dto.put("estado", "error");

		Exchange exchange = exchangeRepo.exchangeBooks(data.petitioner.getId(), data.bookP.getId(), data.owner.getId(),
				data.bookO.getId());
		exchangeRepo.deleteById(exchange.getId());

		Book bookP = bookRepo.getById(data.bookP.getId());
		bookP.setReserved(null);
		bookRepo.save(bookP);
		Book bookO = bookRepo.getById(data.bookO.getId());
		bookO.setReserved(null);
		bookRepo.save(bookO);

		dto.put("estado", "correcto");

		return dto;
	}

	@GetMapping("/getExchangedBooks/{id}")
	public DTO getExchangedBooks(@PathVariable(value = "id") int id) {
		DTO dto = new DTO();
		dto.put("estado", "error");

		List<Exchange> exchangeList = new ArrayList<Exchange>();

		exchangeList = exchangeRepo.getExchangedBooks(id);

		// Guardar en una lista los dueños de cada libro en el mismo orden
		List<User> userPList = new ArrayList<User>();
		List<Book> bookPList = new ArrayList<Book>();
		List<User> userOList = new ArrayList<User>();
		List<Book> bookOList = new ArrayList<Book>();

		for (Exchange e : exchangeList) {
			userPList.add(userRepo.getById(e.getUserP().getId()));
			bookPList.add(bookRepo.getById(e.getBookP().getId()));
			userOList.add(userRepo.getById(e.getIdUserO()));
			bookOList.add(bookRepo.getById(e.getIdBookO()));
		}

		dto.put("usersP", userPList);
		dto.put("booksP", bookPList);
		dto.put("usersO", userOList);
		dto.put("booksO", bookOList);
		dto.put("estado", "correcto");

		return dto;
	}
}
