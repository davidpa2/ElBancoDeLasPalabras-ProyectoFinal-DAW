package com.book.repository;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.book.model.entities.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Serializable>{
	public abstract List<Book> findByUserId(int idUser);
	public abstract List<Book> getAllBooksForSale(int idUser);
	public abstract List<Book> getAllBooks();
	public abstract List<Book> getBuyReservedBooks(int idUser);
	public abstract List<Book> getSelledBooks(int idUser);
	public abstract int countBooks(int idUser);
	@Query("SELECT b FROM Book b where user_id != :userId and state > 0 and (title like %:search% or author like %:search%)")
	List<Book> lookForABook(@Param("search")String search, @Param("userId")int userId);
	@Query("SELECT b FROM Book b where state > 0 and (title like %:search% or author like %:search%)")
	List<Book> lookForABookNoUser(@Param("search")String search);
}
