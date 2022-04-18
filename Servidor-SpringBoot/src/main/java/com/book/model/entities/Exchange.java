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
public class Exchange implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;

	private String date;

	private int idBookP;

	private int idBookT;

	private int idPetitioner;

	private int idTitular;

	//bi-directional one-to-one association to Book
	@OneToOne
	@JoinColumn(name="id")
	@JsonIgnore
	private Book book1;

	//bi-directional one-to-one association to Book
	@OneToOne
	@JoinColumn(name="id")
	@JsonIgnore
	private Book book2;

	//bi-directional one-to-one association to User
	@OneToOne
	@JoinColumn(name="id")
	@JsonIgnore
	private User user1;

	//bi-directional one-to-one association to User
	@OneToOne
	@JoinColumn(name="id")
	@JsonIgnore
	private User user2;

	public Exchange() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDate() {
		return this.date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public int getIdBookP() {
		return this.idBookP;
	}

	public void setIdBookP(int idBookP) {
		this.idBookP = idBookP;
	}

	public int getIdBookT() {
		return this.idBookT;
	}

	public void setIdBookT(int idBookT) {
		this.idBookT = idBookT;
	}

	public int getIdPetitioner() {
		return this.idPetitioner;
	}

	public void setIdPetitioner(int idPetitioner) {
		this.idPetitioner = idPetitioner;
	}

	public int getIdTitular() {
		return this.idTitular;
	}

	public void setIdTitular(int idTitular) {
		this.idTitular = idTitular;
	}

	public Book getBook1() {
		return this.book1;
	}

	public void setBook1(Book book1) {
		this.book1 = book1;
	}

	public Book getBook2() {
		return this.book2;
	}

	public void setBook2(Book book2) {
		this.book2 = book2;
	}

	public User getUser1() {
		return this.user1;
	}

	public void setUser1(User user1) {
		this.user1 = user1;
	}

	public User getUser2() {
		return this.user2;
	}

	public void setUser2(User user2) {
		this.user2 = user2;
	}

}