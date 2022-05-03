package com.book.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.book.model.entities.Book;
import com.book.model.entities.User;
import com.book.repository.BookRepository;
import com.fasterxml.jackson.annotation.JsonProperty;

@CrossOrigin
@RestController
public class BookController {

	@Autowired
	BookRepository bookRepo;
	
	@GetMapping("/getAllBooks")
	public DTO allBooks() {
		DTO dto = new DTO();

		dto.put("users", bookRepo.findAll());

		return dto;
	}
	
	@PostMapping("uploadBook")
	public DTO uploadBook(@RequestBody DataUploadBook data) {
		DTO dto = new DTO(); // Devolver un dto

		Book b = new Book();
		
		b.setTitle(data.title);
		b.setAuthor(data.author);
		b.setDescription(data.description);
		b.setState(data.state);
		b.setPrice(data.price);
		b.setImg(data.img);
		b.setUser(data.user);
		dto.put("correcto", true);
		
		this.bookRepo.save(b);		
		
		return dto;
	}
	
	/**
	 * Clase que contiene los datos de registro del usuario
	 */
	static class DataUploadBook {
		@JsonProperty("title")
		String title;
		@JsonProperty("author")
		String author;
		@JsonProperty("description")
		String description;
		@JsonProperty("state")
		int state;
		@JsonProperty("price")
		String price;
		@JsonProperty("img")
		byte[] img;
		@JsonProperty("buyer")
		User buyer;
		@JsonProperty("user")
		User user;

		public DataUploadBook(String title, String author, String description, int state, String price, byte[] img,
				User buyer, User user) {
			super();
			this.title = title;
			this.author = author;
			this.description = description;
			this.state = state;
			this.price = price;
			this.img = img;
			this.buyer = buyer;
			this.user = user;
		}
	}
}
