package com.book.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.book.model.entities.User;
import com.book.repository.UserRepository;
import com.book.security.AutenticadorJWT;

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

	@PostMapping("autenticate")
	public DTO autenticateUser(@RequestBody DatosAutenticacionUsuario datos) {
		DTO dto = new DTO(); // Voy a devolver un dto

		// Intento localizar un usuario a partir de su nombre de usuario y su password
		User usuAutenticado = userRepo.findByEmailAndPassword(datos.email, datos.password);
		if (usuAutenticado != null) {
			dto.put("jwt", AutenticadorJWT.codificaJWT(usuAutenticado));
		}

		// Finalmente devuelvo el JWT creado, puede estar vacío si la autenticación no
		// ha funcionado
		return dto;
	}

	/**
	 * Clase que contiene los datos de autenticacion del usuario
	 */
	static class DatosAutenticacionUsuario {
		String email;
		String password;

		public DatosAutenticacionUsuario(String email, String password) {
			super();
			this.email = email;
			this.password = password;
		}
	}
}
