package com.book.model.entities;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;


/**
 * The persistent class for the exchange database table.
 * 
 */
@Entity
@NamedQuery(name="Exchange.findAll", query="SELECT e FROM Exchange e")
@NamedQuery(name="Exchange.getExchangeReservedBooks", query="SELECT e FROM Exchange e where idUserO = ?1 and date = null")
public class Exchange implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;

	private String date;

	@ManyToOne
	private User userP;
	
	@ManyToOne
	private Book bookP;
	
	private int idUserO;
	
	private int idBookO;

	public Exchange() {
		
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public User getUserP() {
		return userP;
	}

	public void setUserP(User userP) {
		this.userP = userP;
	}

	public Book getBookP() {
		return bookP;
	}

	public void setBookP(Book bookP) {
		this.bookP = bookP;
	}

	public int getIdUserO() {
		return idUserO;
	}

	public void setIdUserO(int idUserO) {
		this.idUserO = idUserO;
	}

	public int getIdBookO() {
		return idBookO;
	}

	public void setIdBookO(int idBookO) {
		this.idBookO = idBookO;
	}
}