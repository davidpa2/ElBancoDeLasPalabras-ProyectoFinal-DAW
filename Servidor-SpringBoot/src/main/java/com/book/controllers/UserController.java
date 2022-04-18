package com.book.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.book.repository.UserRepository;

@RestController
public class UserController {
	
	@Autowired
	UserRepository userRepo;

	@GetMapping("/getAllUsers")
	public DTO doGet() {
		
		DTO dto = new DTO();
		
		dto.put("users", userRepo.findAll());
		
		return dto;
	}
} 
