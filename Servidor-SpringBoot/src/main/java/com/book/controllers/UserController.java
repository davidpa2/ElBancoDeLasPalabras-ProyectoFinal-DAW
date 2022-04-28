package com.book.controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.book.model.entities.User;
import com.book.repository.UserRepository;
import com.book.security.AutenticadorJWT;
import com.fasterxml.jackson.annotation.JsonProperty;

@CrossOrigin
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
	
	@PostMapping("register")
	public DTO registerUser(@RequestBody DatosRegisterUser datos) {
		DTO dto = new DTO(); // Voy a devolver un dto

		User u = new User();
		
		u.setName(datos.name);
		u.setSurnames(datos.surnames);
		u.setEmail(datos.email);
		u.setPassword(datos.password);
		u.setImg(datos.img);	
		this.userRepo.save(u);
		
		// Intento localizar un usuario a partir de su nombre de usuario y su password
		User autenticatedUser = userRepo.findByEmailAndPassword(datos.email, datos.password);
		if (autenticatedUser != null) {
			dto.put("jwt", AutenticadorJWT.codificaJWT(autenticatedUser));
		}

		// Finalmente devuelvo el JWT creado, puede estar vacío si la autenticación no
		// ha funcionado
		return dto;
	}
	
	/**
	 * Clase que contiene los datos de registro del usuario
	 */
	static class DatosRegisterUser {
		String name;
		String surnames;
		String email;
		String password;
		byte[] img;

		public DatosRegisterUser(String name, String surnames, String email, String password, byte[] img) {
			super();
			this.name = name;
			this.surnames = surnames;
			this.email = email;
			this.password = password;
			this.img = img;
		}
	}

	@GetMapping("/authenticatedUserData")
	public DTO listarAutenticado(HttpServletRequest request) {
		DTO dtoUser = new DTO();
		System.out.println("El request => " + request);
		int idUsuarioAutenticado = AutenticadorJWT.getIdUsuarioDesdeJwtIncrustadoEnRequest(request);
		System.out.println("Id de autenticado => " + idUsuarioAutenticado);
		User user = userRepo.getById(idUsuarioAutenticado);
		dtoUser.put("id", user.getId());
		dtoUser.put("email", user.getEmail());
		dtoUser.put("name", user.getName());
		dtoUser.put("surnames", user.getSurnames());
		dtoUser.put("description", user.getDescription());
		dtoUser.put("birthday", user.getBirthday());
		dtoUser.put("tlf", user.getTlf());
		dtoUser.put("telegram", user.getTelegram());
		dtoUser.put("img", user.getImg());
		dtoUser.put("rating", user.getRating());
		return dtoUser;
	}

	@PostMapping("/modifyUser")
	public DTO modificarUsuario(@RequestBody DatosModificarUsuario d) {

		DTO dto = new DTO();
		dto.put("estado", "error");

		User usuario = userRepo.getById(d.id);

		usuario.setName(d.name);
		usuario.setSurnames(d.surnames);
		usuario.setDescription(d.description);
		usuario.setBirthday(d.birthday);
		usuario.setTlf(d.tlf);
		usuario.setTelegram(d.telegram);
		usuario.setBirthday(d.birthday);
		usuario.setImg(d.img);

		userRepo.save(usuario);

		dto.put("idUser", usuario.getId());
		dto.put("estado", "correcto");
		return dto;
	}

	static class DatosModificarUsuario {
		@JsonProperty("id")
		int id;
		@JsonProperty("name")
		String name;
		@JsonProperty("surnames")
		String surnames;
		@JsonProperty("description")
		String description;
		@JsonProperty("birthday")
		String birthday;
		@JsonProperty("tlf")
		String tlf;
		@JsonProperty("telegram")
		String telegram;
		@JsonProperty("img")
		byte[] img;

		public DatosModificarUsuario(int id, String name, String surnames, String description, String birthday, String tlf,
				String telegram, byte[] img) {
			super();
			this.id = id;
			this.name = name;
			this.surnames = surnames;
			this.description = description;
			this.birthday = birthday;
			this.tlf = tlf;
			this.telegram = telegram;
			this.img = img;
		}
	}
}
