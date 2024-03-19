package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Recipe;
import com.example.demo.service.RecipeService;

@CrossOrigin("*")
@RequestMapping("/recipes")
@RestController
public class RecipeController {
	
	private RecipeService recipeService;

	public RecipeController(RecipeService recipeService) {
		super();
		this.recipeService = recipeService;
	}
	
	@PostMapping
	public ResponseEntity<Recipe> uploadrecipe(@RequestBody Recipe recipe)
	{
		return new ResponseEntity<Recipe>(recipeService.uploadrecipe(recipe),HttpStatus.CREATED);
	}
	
	@GetMapping()
	public List<Recipe> addrecipes()
	{
		return recipeService.addrecipes();
	}
	
	@PostMapping("/{id}")
	public ResponseEntity<Recipe> updaterecipe(@PathVariable("id") long id, @RequestBody Recipe recipe)
	{
		return new ResponseEntity<Recipe>(recipeService.updaterecipe(id, recipe), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Map<String,String>> deleterecipe(@PathVariable("id") long id)
	{
		try
		{
			recipeService.deleterecipe(id);
			Map<String,String> res = new HashMap<>();
			res.put("message", "Recipe deleted successfully");
			return new ResponseEntity<>(res, HttpStatus.OK);
			
		}
		catch(Exception e)
		{
			Map<String,String> err = new HashMap<>();
			err.put("error", "" + e.getMessage());
			return new ResponseEntity<>(err, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	

}
