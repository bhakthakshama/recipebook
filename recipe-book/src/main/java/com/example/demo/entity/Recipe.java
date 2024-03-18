package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "recipebookcontents")
public class Recipe {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String foodname;
	private String timetaken;
	private String ingredients;
	private int rating;
	private String review;
	
	public Recipe()
	{
		
	}
	
	public Recipe(long id, String foodname, String timetaken, String ingredients, int rating, String review) {
		super();
		this.id = id;
		this.foodname = foodname;
		this.timetaken = timetaken;
		this.ingredients = ingredients;
		this.rating = rating;
		this.review = review;
	}

	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getFoodname() {
		return foodname;
	}
	public void setFoodname(String foodname) {
		this.foodname = foodname;
	}
	public String getTimetaken() {
		return timetaken;
	}
	public void setTimetaken(String timetaken) {
		this.timetaken = timetaken;
	}
	public String getIngredients() {
		return ingredients;
	}
	public void setIngredients(String ingredients) {
		this.ingredients = ingredients;
	}
	public int getRating() {
		return rating;
	}
	public void setRating(int rating) {
		this.rating = rating;
	}
	public String getReview() {
		return review;
	}
	public void setReview(String review) {
		this.review = review;
	}
	
}
