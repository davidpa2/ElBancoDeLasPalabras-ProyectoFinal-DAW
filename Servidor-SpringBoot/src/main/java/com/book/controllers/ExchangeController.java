package com.book.controllers;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.book.model.entities.Book;
import com.book.model.entities.Exchange;
import com.book.model.entities.User;
import com.book.repository.BookRepository;
import com.book.repository.ExchangeRepository;
import com.fasterxml.jackson.annotation.JsonProperty;

@CrossOrigin
@RestController
public class ExchangeController {
	
	@Autowired
	ExchangeRepository exchangeRepo;
	@Autowired
	BookRepository bookRepo;

	@PostMapping("/reserveExchangeBook")
	public DTO reserveExchangeBook(@RequestBody DataExchange data) {
		DTO dto = new DTO();
		dto.put("estado", "error");
		
		Exchange exchange = new Exchange();
		exchange.setBookP(data.bookP);
		exchange.setUserP(data.petitioner);
		exchange.setIdBookO(data.bookO);
		exchange.setIdUserO(data.owner);
		
		Date currentDate = new Date();
		exchange.setDate(new SimpleDateFormat("dd-MM-yyyy").format(currentDate));
		
		Book bookP = bookRepo.getById(data.bookP.getId());
		bookP.setReserved(-1);
		bookRepo.save(bookP);
		Book bookO = bookRepo.getById(data.bookO);
		bookO.setReserved(-1);
		bookRepo.save(bookO);
		
		exchangeRepo.save(exchange);
		
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
		int bookO;
		@JsonProperty("owner")
		int owner;

		public DataExchange(Book bookP, User petitioner, int bookO, int owner) {
			super();
			this.bookP = bookP;
			this.petitioner = petitioner;
			this.bookO = bookO;
			this.owner = owner;
		}
	}
}
