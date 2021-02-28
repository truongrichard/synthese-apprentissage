package com.synthese.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "workouts")
public class Workout {
  @Id
  private String id;

  private String title;
  private String description;
  private LocalDate date;
  private List<ExercisePerformance> exercises;

  public Workout() {

  }

  public Workout(String title, String description) {
    this.title = title;
    this.description = description;
    this.date = LocalDate.now();
  }

  public String getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }

  public List<ExercisePerformance> getExercises() {
    return exercises;
  }

  public void setExercises(List<ExercisePerformance> exercises) {
    this.exercises = exercises;
  }
}
