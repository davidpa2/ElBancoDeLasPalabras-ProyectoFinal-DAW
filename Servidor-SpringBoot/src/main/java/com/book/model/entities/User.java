package com.book.model.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;


/**
 * The persistent class for the user database table.
 * 
 */
@Entity
@Table(name = "user")
@NamedQuery(name="User.findAll", query="SELECT u FROM User u")
@NamedQuery(name="User.getUserByMail", query="SELECT u FROM User u where email = ?1")
public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;

	private String birthday;

	private String description;

	private String email;

	@Lob
	private byte[] img;

	private String name;

	private String password;

	private String surnames;

	private String telegram;

	private String tlf;
	
	private float rating;
	
	private String location;
	
	private String recoveryKey;

	//bi-directional one-to-one association to Book
	@OneToMany(mappedBy="user")
	@JsonIgnore
	private List<Book> books;
	
	//bi-directional one-to-one association to Exchange
	@OneToMany(mappedBy="userP")
	@JsonIgnore
	private List<Exchange> exchanges;


	public User() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getBirthday() {
		return this.birthday;
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public byte[] getImg() {
		return this.img;
	}

	public void setImg(byte[] img) {
		this.img = img;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getSurnames() {
		return this.surnames;
	}

	public void setSurnames(String surnames) {
		this.surnames = surnames;
	}

	public String getTelegram() {
		return this.telegram;
	}

	public void setTelegram(String telegram) {
		this.telegram = telegram;
	}

	public String getTlf() {
		return this.tlf;
	}

	public void setTlf(String tlf) {
		this.tlf = tlf;
	}
	
	public float getRating() {
		return this.rating;
	}

	public void setRating(float rating) {
		this.rating = rating;
	}
	
	public String getLocation() {
		return this.location;
	}
	
	public void setLocation(String location) {
		this.location = location;
	}
	
	public String getRecoveryKey() {
		return this.recoveryKey;
	}
	
	public void setRecoveryKey(String recoveryKey) {
		this.recoveryKey = recoveryKey;
	}
	
	public List<Book> getBooks() {
		return this.books;
	}

	public void setBooks(List<Book> books) {
		this.books = books;
	}
	
	public Book addBook(Book book) {
		getBooks().add(book);
		book.setUser(this);

		return book;
	}

	public Book removeBook(Book book) {
		getBooks().remove(book);
		book.setUser(null);

		return book;
	}
	
	public List<Exchange> getExchanges() {
		return this.exchanges;
	}
	
	public void setExchanges(List<Exchange> exchanges) {
		this.exchanges = exchanges;
	}
	
	public Exchange addExchange(Exchange exchange) {
		getExchanges().add(exchange);
		exchange.setUserP(this);
		
		return exchange;
	}
	
	public Exchange removeExchange(Exchange exchange) {
		getExchanges().remove(exchange);
		exchange.setUserP(null);
		
		return exchange;
	}


}