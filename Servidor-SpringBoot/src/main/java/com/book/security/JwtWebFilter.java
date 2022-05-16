package com.book.security;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebFilter(urlPatterns = "/*")
public class JwtWebFilter implements Filter {

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {

	}

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
			throws IOException, ServletException {

		HttpServletRequest request = (HttpServletRequest) servletRequest; // Obtengo un objeto request, con la petició
																			// recibida desde el cliente
		String urlWebRequest = request.getRequestURI(); // Obtengo la URL a la que se dirige la petición web
		String requiredMethod = request.getMethod(); // Obtengo el método de la petición: GET, POST, PUT, DELETE,
														// OPTIONS, etc...
		int idUserByJWT = AutenticadorJWT.getIdUsuarioDesdeJwtIncrustadoEnRequest(request); // Obtengo un posible id de
																							// usuario
		// contenido dentro de un JWT, guardado en un header del request realizado

		System.out.println("Log - request: " + urlWebRequest + " - " + request.getMethod());
		// Si se accede a la autenticación de usuario o ya existe un usuario
		// autenticado, dejo pasar la petición
		if (requiredMethod.equalsIgnoreCase("OPTIONS") || // Si se recibe una petición options, se deja pasar por el
															// filtro
				urlWebRequest.startsWith("/getAllBooksForSale") || // Se pueden pedir todos los libros del catálogo sin
																	// iniciar sesión
				urlWebRequest.startsWith("/getBookById") || // Se pueden pedir todos los libros del catálogo sin iniciar
															// sesión
				urlWebRequest.startsWith("/getUserById") || // Se pueden acceder al perfil de un usuario sin haber
															// iniciado sesión
				urlWebRequest.equals("/autenticate") || // Web de autenticado, aunque no traiga JWT en la cabecera se le
														// permite pasar
				urlWebRequest.equals("/register") || // Web de registro, aunque no traiga JWT en la cabecera se le
														// permite pasar
				idUserByJWT != -1) { // Cualquier petición con un JWT válido, que tenga un id de usuario encriptado
			filterChain.doFilter(servletRequest, servletResponse); // Permito que la ejecución del request continúe su
																	// curso
		} else {
			// En caso contrario, deniego el acceso
			HttpServletResponse response = (HttpServletResponse) servletResponse; // Obtengo el objeto response de la
																					// petición request
			response.sendError(403, "No autorizado"); // Establezco un estado de 403 - Acceso prohibido.
		}

	}

	@Override
	public void destroy() {

	}

}
