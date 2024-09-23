package com.mtk.products.model;

import jakarta.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "products")
@Getter
@Setter
@RequiredArgsConstructor
@EqualsAndHashCode
public class Product implements Serializable
{
	@Serial
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long code;
	private String name;
	private String brand;
}
