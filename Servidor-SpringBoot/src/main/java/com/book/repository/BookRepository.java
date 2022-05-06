package com.book.repository;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.book.model.entities.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Serializable>{
	public abstract List<Book> findByUserId(int idUser);
}
