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
import com.book.service.SendMailService;
import com.fasterxml.jackson.annotation.JsonProperty;

@CrossOrigin
@RestController
public class BookController {

	@Autowired
	BookRepository bookRepo;
	@Autowired
	UserRepository userRepo;
	@Autowired
	SendMailService sendMailService;
	
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
	@RequestMapping(value="/findByUserId/{id}")
	public DTO findByUserId(@PathVariable(value="id") int id) {
		DTO dto = new DTO();
		// asumimos que va a salir mal
		dto.put("estado", "error");
		// lista de dto que meteremos en dto que devolveremos
		List<DTO> dtoBooks = new ArrayList<DTO>();
		
		List<Book> bookList = new ArrayList<Book>();
		
		bookList = this.bookRepo.findByUserId(id);

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

		List<Book> bookList = new ArrayList<Book>();
		//Si se ha accedido sin iniciar sesión buscamos todos los libros subidos según la búsqueda
		if (id == -1) {
			bookList = bookRepo.lookForABookNoUser(search);
		} else {			
			// buscamos todos los libros según el id del usuario y la búsqueda
			bookList = bookRepo.lookForABook(search, id);
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
		dto.put("bookList", bookList);
		return dto;
	}
	
	@PostMapping("/reserveBuyBook")
	public DTO reserveBook(@RequestBody DataSellBook data) {
		
		DTO dto = new DTO();
		// asumimos que va a salir mal
		dto.put("estado", "error");

		// localizar el libro por su id
		Book book = this.bookRepo.getById(data.book.getId());
		
		book.setReserved(1);
		book.setBuyer_id(data.buyer.getId());

		//Guardar los cambios realizados en el libro
		bookRepo.save(book);		

		//Si todo hay ido bien asignamos el estado como correcto y devolvemos el dto con la lista de libros
		dto.put("estado", "correcto");
		return dto;
	}
	
	static class DataSellBook {		
		@JsonProperty("book")
		Book book;
		@JsonProperty("owner")
		User owner;
		@JsonProperty("buyer")
		User buyer;

		public DataSellBook(Book book, User owner, User buyer) {
			super();
			this.book = book;
			this.owner = owner;
			this.buyer = buyer;
		}
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
	
	@GetMapping("/sellBook/{id}")
	public DTO sellBook(@PathVariable(value="id") int id) {
		DTO dto = new DTO();
		dto.put("estado", "correcto");
		
		Book book = bookRepo.getById(id);
		
		// Vamos a entender que al poner reservado como -1 será que se ha terminado comprando el libro
		book.setReserved(-1);
		
		bookRepo.save(book);
		
		dto.put("estado", "correcto");
		
		return dto;
	}
	
	@GetMapping("/cancelPurchase/{id}")
	public DTO cancelPurchase(@PathVariable(value="id") int id) {
		DTO dto = new DTO();
		dto.put("estado", "error");
		
		Book book = bookRepo.getById(id);
		
		// Vamos a entender que al poner reservado como -1 será que se ha terminado comprando el libro
		book.setReserved(null);
		book.setBuyer_id(null);
		
		bookRepo.save(book);
		
		dto.put("estado", "correcto");
		
		return dto;
	}
	
	@GetMapping("/getSelledBooks/{id}")
	public DTO getSelledBooks(@PathVariable(value="id") int id) {
		DTO dto = new DTO();
		dto.put("estado", "error");
		
		List<Book> bookList = bookRepo.getSelledBooks(id);
		List<User> userBuyerList = new ArrayList<User>();
		
		//Recorrer la lista de libros para obtener una lista de usuarios simétrica que han comprado los libros
		for (Book book : bookList) {
			userBuyerList.add(userRepo.getById(book.getBuyer_id()));
		}
		
		dto.put("buyers", userBuyerList);
		dto.put("selledBooks", bookList);
		dto.put("estado", "correcto");
		
		return dto;
	}
}
