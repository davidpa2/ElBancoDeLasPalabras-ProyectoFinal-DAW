package com.book.model.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;


/**
 * The persistent class for the book database table.
 * 
 */
@Entity
@Table(name = "book")
@NamedQuery(name="Book.findAll", query="SELECT b FROM Book b")
@NamedQuery(name="Book.findByUserId", query="SELECT b FROM Book b where user_id = ?1 and state > 0 and (reserved = null or reserved > 0)")
@NamedQuery(name="Book.getAllBooksForSale", query="SELECT b FROM Book b where user_id != ?1 and state > 0 and reserved = null")
@NamedQuery(name="Book.getAllBooks", query="SELECT b FROM Book b where state > 0 and reserved = null")
@NamedQuery(name="Book.getBuyReservedBooks", query="SELECT b FROM Book b where reserved = 1 and buyer_id != null and user_id = ?1")
@NamedQuery(name="Book.getSelledBooks", query="SELECT b FROM Book b where user_id = ?1 and reserved = -1 and buyer_id != null")
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

	private Integer reserved;
	
	private Integer buyer_id;
	
	//bi-directional many-to-one association to User
	@ManyToOne
	private User user;

	//bi-directional one-to-one association to Exchange
	@OneToMany(mappedBy="bookP")
	@JsonIgnore
	private List<Exchange> exchanges;

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
	
	public Integer getReserved() {
		return this.reserved;
	}

	public void setReserved(Integer reserved) {
		this.reserved = reserved;
	}
	
	public Integer getBuyer_id() {
		return this.buyer_id;
	}
	
	public void setBuyer_id(Integer buyer_id) {
		this.buyer_id = buyer_id;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	
	
	public List<Exchange> getExchanges() {
		return this.exchanges;
	}
	
	public void setExchanges(List<Exchange> exchanges) {
		this.exchanges = exchanges;
	}
	
	public Exchange addExchange(Exchange exchange) {
		getExchanges().add(exchange);
		exchange.setBookP(this);
		
		return exchange;
	}
	
	public Exchange removeExchange(Exchange exchange) {
		getExchanges().remove(exchange);
		exchange.setBookP(null);
		
		return exchange;
	}

}