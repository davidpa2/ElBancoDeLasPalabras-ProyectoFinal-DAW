package com.book.repository;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.book.model.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Serializable>{
	
	public User findByEmailAndPassword(String email,String password);
	public abstract User getUserByMail(String mail);
}
