package com.book.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
		System.out.println(data.user.getId());
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
		@JsonProperty("user")
		User user;

		public DataUploadBook(String title, String author, String description, int state, String price, byte[] img, User user) {
			super();
			this.title = title;
			this.author = author;
			this.description = description;
			this.state = state;
			this.price = price;
			this.img = img;
			this.user = user;
		}
	}
	
	/**
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping("/findByUserId/{id}")
	public DTO findByUserId(@PathVariable(value="id") int id) {
		DTO dto = new DTO();
		// asumimos que va a salir mal
		dto.put("estado", "error");
		// lista de dto que meteremos en dto que devolveremos
		List<DTO> dtoBooks = new ArrayList<DTO>();
		// buscamos todos los libros según el id del usuario
		List<Book> bookList = this.bookRepo.findByUserId(id);

		for (Book b : bookList) {
			DTO books = new DTO();
			// creamos dto de objeto
			books.put("id", b.getId());
			books.put("title", b.getTitle());
			books.put("author", b.getAuthor());
			books.put("description", b.getDescription());
			books.put("state", b.getState());
			books.put("price", b.getPrice());
			books.put("img", b.getImg());
			// metemos cada dto en la lista dtos
			dtoBooks.add(books);
		}
		//Si todo hay ido bien asignamos el estado como correcto y devolvemos el dto con la lista de libros
		dto.put("estado", "correcto");
		dto.put("bookList", dtoBooks);
		return dto;
	}
}
