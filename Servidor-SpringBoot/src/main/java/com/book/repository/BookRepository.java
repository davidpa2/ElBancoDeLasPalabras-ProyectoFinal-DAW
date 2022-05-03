package com.book.repository;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.book.model.entities.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Serializable>{

}
