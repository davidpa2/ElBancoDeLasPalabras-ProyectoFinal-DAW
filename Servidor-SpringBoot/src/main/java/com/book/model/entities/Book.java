package com.book.model.entities;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;


/**
 * The persistent class for the book database table.
 * 
 */
@Entity
@Table(name = "book")
@NamedQuery(name="Book.findAll", query="SELECT b FROM Book b")
@NamedQuery(name="Book.findByUserId", query="SELECT b FROM Book b where user_id = ?1 and state != -1")
@NamedQuery(name="Book.getAllBooksForSale", query="SELECT b FROM Book b where user_id != ?1 and state != -1")
@NamedQuery(name="Book.getAllBooks", query="SELECT b FROM Book b where state != -1")
// @NamedQuery(name="Book.lookForABook", query="SELECT b FROM Book b where state != -1 and title like %?1%")
public class Book implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;

	private String author;

	private String description;

	@Lob
	private byte[] img;

	private String price;

	private int state;

	private String title;

	//bi-directional many-to-one association to User
	@ManyToOne
	private User user;
	

	//bi-directional one-to-one association to Exchange
	@OneToOne(mappedBy="book1")
	@JsonIgnore
	private Exchange exchange1;

	//bi-directional one-to-one association to Exchange
	@OneToOne(mappedBy="book2")
	@JsonIgnore
	private Exchange exchange2;

	public Book() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAuthor() {
		return this.author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public byte[] getImg() {
		return this.img;
	}

	public void setImg(byte[] img) {
		this.img = img;
	}

	public String getPrice() {
		return this.price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public int getState() {
		return this.state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Exchange getExchange1() {
		return this.exchange1;
	}

	public void setExchange1(Exchange exchange1) {
		this.exchange1 = exchange1;
	}

	public Exchange getExchange2() {
		return this.exchange2;
	}

	public void setExchange2(Exchange exchange2) {
		this.exchange2 = exchange2;
	}

}