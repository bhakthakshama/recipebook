package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Recipe;

public interface RecipeService {
	
	List<Recipe> addrecipes();
	
	Recipe uploadrecipe(Recipe recipe);
	
	Recipe updaterecipe(long id, Recipe recipe);
	
	void deleterecipe(long id);

}
