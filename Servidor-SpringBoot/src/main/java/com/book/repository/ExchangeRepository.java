package com.book.repository;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.book.model.entities.Exchange;

@Repository
public interface ExchangeRepository extends JpaRepository<Exchange, Serializable> {
	public abstract List<Exchange> getExchangeReservedBooks(int idUser);
}
