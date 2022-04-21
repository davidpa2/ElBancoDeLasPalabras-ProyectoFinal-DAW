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

@WebFilter(urlPatterns = "/*")
public class JwtWebFilter implements Filter{

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		
	}

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
			throws IOException, ServletException {
		String uriDePeticionWeb = ((HttpServletRequest)servletRequest).getRequestURI();
		System.out.println("\tURI buscada: " + uriDePeticionWeb);
		
		filterChain.doFilter(servletRequest, servletResponse);
	}
	
	@Override
	public void destroy() {
		
	}
	
}
