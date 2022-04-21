package com.book;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@ServletComponentScan
@SpringBootApplication
public class ServidorSpringBootApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServidorSpringBootApplication.class, args);
	}

}
