package com.mtk.products.controller;

import com.mtk.products.model.Product;
import com.mtk.products.model.Response;
import com.mtk.products.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "*")
public class ProductController
{
	private final ProductService service;

	@Autowired
	public ProductController(ProductService service)
	{
		this.service = service;
	}

	@GetMapping("/route")
	public String route()
	{
		return "Product API working!";
	}

	@GetMapping("/list")
	public Iterable<Product> list()
	{
		return service.findAll();
	}

	@PostMapping
	public ResponseEntity<?> register(@RequestBody Product product)
	{
		return service.registerOrUpdate(product, "register");
	}

	@PutMapping
	public ResponseEntity<?> update(@RequestBody Product product)
	{
		return service.registerOrUpdate(product, "update");
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Response> remove(@PathVariable long id)
	{
		return service.remove(id);
	}
}
