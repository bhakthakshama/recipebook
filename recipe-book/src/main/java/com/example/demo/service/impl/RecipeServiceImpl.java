package com.example.demo.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Recipe;
import com.example.demo.repository.RecipeRepository;
import com.example.demo.service.RecipeService;

@Service
public class RecipeServiceImpl implements RecipeService{
	
	private RecipeRepository recipeRepository;

	public RecipeServiceImpl(RecipeRepository recipeRepository) {
		super();
		this.recipeRepository = recipeRepository;
	}

	@Override
	public List<Recipe> addrecipes() {
		return recipeRepository.findAll();
	}

	@Override
	public Recipe uploadrecipe(Recipe recipe) {
		return recipeRepository.save(recipe);
	}

	

	@Override
	public void deleterecipe(long id) {
		recipeRepository.findById(id).orElseThrow(() -> new RuntimeException("Recipe couldn't be deleted"));
		recipeRepository.deleteById(id);
	}

	@Override
	public Recipe updaterecipe(long id, Recipe recipe) {
		Recipe existingrecipe = recipeRepository.findById(id).orElseThrow(() -> new RuntimeException("Recipe doesn't exist"));
		existingrecipe.setFoodname(recipe.getFoodname());
		existingrecipe.setTimetaken(recipe.getTimetaken());
		existingrecipe.setIngredients(recipe.getIngredients());
		existingrecipe.setRating(recipe.getRating());
		existingrecipe.setReview(recipe.getReview());
		return recipeRepository.save(existingrecipe);
	}

}
