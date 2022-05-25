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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.book.model.entities.Book;
import com.book.model.entities.User;
import com.book.repository.BookRepository;
import com.book.repository.UserRepository;
import com.fasterxml.jackson.annotation.JsonProperty;

@CrossOrigin
@RestController
public class BookController {

	@Autowired
	BookRepository bookRepo;
	@Autowired
	UserRepository userRepo;
	
	/**
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping("/getBookById/{id}")
	public DTO getBookById(@PathVariable(value="id") int id) {
		DTO dto = new DTO();
		// asumimos que va a salir mal
		dto.put("estado", "error");
		
		Book book = this.bookRepo.getById(id);

		//Si todo hay ido bien asignamos el estado como correcto y devolvemos el dto con la lista de libros
		dto.put("estado", "correcto");
		dto.put("book", book);
		return dto;
	}
	
	@GetMapping("/getAllBooks")
	public DTO allBooks() {
		DTO dto = new DTO();

		dto.put("users", bookRepo.findAll());

		return dto;
	}
	
	@RequestMapping("/getAllBooksForSale/{id}")
	public DTO getAllBooksForSale(@PathVariable(value="id") int id) {
		DTO dto = new DTO();
		dto.put("estado", "correcto");
		
		List <Book> bookList = new ArrayList<Book>();
		
		//Puede pasar que el id sea -1, quiere decir que se ha accedido a la app sin iniciar sesión
		if (id == -1) {
			bookList = bookRepo.getAllBooks();
		} else {			
			//Obtenemos todos los libros que no tengan como user_id el id del usuario que los ha pedido
			bookList = bookRepo.getAllBooksForSale(id);
		}
		//Guardar en una lista los dueños de cada libro en el mismo orden
		List <User> userList = new ArrayList<User>();
		//Recorrer la lista de libros buscando por el id del usuario que lo haya subido
		for (int i = 0; i < bookList.size(); i++) {
			userList.add(userRepo.getById(bookList.get(i).getUser().getId()));
		}		
		dto.put("books", bookList);
		dto.put("users",userList);
		dto.put("estado", "correcto");
		
		return dto;
	}
	
	@PostMapping("/updateBook")
	public DTO updateBook(@RequestBody DataUploadBook data ) {

		DTO dto = new DTO();
		dto.put("estado", "error");

		Book book = bookRepo.getById(data.id);

		book.setTitle(data.title);
		book.setAuthor(data.author);
		book.setDescription(data.description);
		book.setState(data.state);
		book.setPrice(data.price);
		book.setImg(data.img);

		bookRepo.save(book);

		dto.put("estado", "correcto");
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
		@JsonProperty("id")
		int id;
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

		public DataUploadBook(int id, String title, String author, String description, int state, String price, 
				byte[] img, User user) {
			super();
			this.id = id;
			this.title = title;
			this.author = author;
			this.description = description;
			this.state = state;
			this.price = price;
			this.img = img;
			this.user = user;
		}
	}
	
	@RequestMapping("/deleteBook/{id}")
	public DTO deleteBook(@PathVariable(value="id") int id) {
		DTO dto = new DTO();
		// asumimos que va a salir mal
		dto.put("estado", "error");

		// localizar el libro por su id
		Book book = this.bookRepo.getById(id);
		// Lo eliminaremos poniendo su estado en -1
		book.setState(0);
		//Guardar el libro
		bookRepo.save(book);

		//Si todo hay ido bien asignamos el estado como correcto y devolvemos el dto con la lista de libros
		dto.put("estado", "correcto");
		return dto;
	}
	
	/**
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/findByUserId/{id}/{authenticated}")
	public DTO findByUserId(@PathVariable(value="id") int id, @PathVariable(value="authenticated") boolean authenticated) {
		DTO dto = new DTO();
		// asumimos que va a salir mal
		dto.put("estado", "error");
		// lista de dto que meteremos en dto que devolveremos
		List<DTO> dtoBooks = new ArrayList<DTO>();
		
		List<Book> bookList = new ArrayList<Book>();
		
		if (authenticated) {			
			// buscamos todos los libros según el id del usuario
			bookList = this.bookRepo.findByUserIdAutenticated(id);
		} else {
			// buscamos todos los libros segú
			bookList = this.bookRepo.findByUserId(id);
		}

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
			books.put("reserved", b.getReserved());
			// metemos cada dto en la lista dtos
			dtoBooks.add(books);
		}
		//Si todo hay ido bien asignamos el estado como correcto y devolvemos el dto con la lista de libros
		dto.put("estado", "correcto");
		dto.put("bookList", dtoBooks);
		return dto;
	}
	
	@RequestMapping(value = "/lookForABook/{search}/{id}", method = RequestMethod.GET)
	public DTO lookForABook(@PathVariable(value="search") String search, @PathVariable(value="id") int id) {
		DTO dto = new DTO();
		// asumimos que va a salir mal
		dto.put("estado", "error");
		// lista de dto que meteremos en dto que devolveremos
		List<DTO> dtoBooks = new ArrayList<DTO>();
		List<Book> bookList = new ArrayList<Book>();
		//Si se ha accedido sin iniciar sesión buscamos todos los libros subidos según la búsqueda
		if (id == -1) {
			bookList = bookRepo.lookForABookNoUser(search);
		} else {			
			// buscamos todos los libros según el id del usuario y la búsqueda
			bookList = bookRepo.lookForABook(search, id);
		}

		for (Book b : bookList) {
			System.out.println("VA VAAAAAA");
			DTO books = new DTO();
			// creamos dto de objeto
			books.put("id", b.getId());
			books.put("title", b.getTitle());
			books.put("author", b.getAuthor());
			books.put("description", b.getDescription());
			books.put("state", b.getState());
			books.put("price", b.getPrice());
			books.put("img", b.getImg());
			books.put("reserved", b.getReserved());
			// metemos cada dto en la lista dtos
			dtoBooks.add(books);
		}
		//Guardar en una lista los dueños de cada libro en el mismo orden
		List <User> userList = new ArrayList<User>();
		//Recorrer la lista de libros buscando por el id del usuario que lo haya subido
		for (int i = 0; i < bookList.size(); i++) {
			userList.add(userRepo.getById(bookList.get(i).getUser().getId()));
		}
		//Si todo hay ido bien asignamos el estado como correcto y devolvemos el dto con la lista de libros
		dto.put("estado", "correcto");
		dto.put("userList", userList);
		dto.put("bookList", dtoBooks);
		return dto;
	}
	
	@RequestMapping(value="/reserveBook/{idBook}/{idBuyer}/{action}", method = RequestMethod.GET)
	public DTO reserveBook(@PathVariable(value="idBook") int idBook, @PathVariable(value="idBuyer") int idBuyer,
			@PathVariable(value="action") int action) {
		
		DTO dto = new DTO();
		// asumimos que va a salir mal
		dto.put("estado", "error");

		// localizar el libro por su id
		Book book = this.bookRepo.getById(idBook);
		
		
		switch (action) {
		case 1: { // Si la acción es 1 quiere decir que estamos reservando el libro para comprarlo
			book.setReserved(1);
			book.setBuyer_id(idBuyer);
			break;
		}
		case 2: {
			
			break;
		}
		default:
			throw new IllegalArgumentException("Unexpected value: " + action);
		}
		
		//Guardar los cambios realizados en el libro
		bookRepo.save(book);

		//Si todo hay ido bien asignamos el estado como correcto y devolvemos el dto con la lista de libros
		dto.put("estado", "correcto");
		return dto;
	}
	
	@RequestMapping("/getBuyReservedBooks/{id}")
	public DTO getBuyReservedBooks(@PathVariable(value="id") int id) {
		DTO dto = new DTO();
		dto.put("estado", "correcto");
		
		List <Book> bookList = new ArrayList<Book>();


		bookList = bookRepo.getBuyReservedBooks(id);
		
		//Guardar en una lista los dueños de cada libro en el mismo orden
		List <User> userList = new ArrayList<User>();
		for (Book b : bookList) {
			userList.add(userRepo.getById(b.getBuyer_id()));
		}
			
		dto.put("books", bookList);
		dto.put("users",userList);
		dto.put("estado", "correcto");
		
		return dto;
	}
}
