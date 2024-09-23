package com.mtk.products.service;

import com.mtk.products.model.Product;
import com.mtk.products.model.Response;
import com.mtk.products.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ProductService
{
	private final ProductRepository repository;
	private final Response response;

	@Autowired
	public ProductService(ProductRepository repository, Response response)
	{
		this.repository = repository;
		this.response = response;
	}

	public Iterable<Product> findAll()
	{
		return repository.findAll();
	}

	public ResponseEntity<?> registerOrUpdate(Product product, String action)
	{
		if (product.getName().isEmpty())
		{
			response.setMessage("The product name is mandatory");
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}

		if (product.getBrand().isEmpty())
		{
			response.setMessage("The product brand is mandatory");
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}

		if (action.equals("register"))
		{
			return new ResponseEntity<>(repository.save(product), HttpStatus.CREATED);
		}

		return new ResponseEntity<>(repository.save(product), HttpStatus.OK);
	}

	public ResponseEntity<Response> remove(long code)
	{
		repository.deleteById(code);
		response.setMessage("Product removed");
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}
