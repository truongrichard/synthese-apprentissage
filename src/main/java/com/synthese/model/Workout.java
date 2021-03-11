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
  private Exercise exercise;
  private List<ExerciseSet> exerciseSets;

  public Workout() {

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

  public Exercise getExercise() { return exercise; }

  public void setExercise(Exercise exercise) { this.exercise = exercise; }

  public List<ExerciseSet> getExerciseSets() {
    return exerciseSets;
  }

  public void setExerciseSets(List<ExerciseSet> exerciseSets) {
    this.exerciseSets = exerciseSets;
  }
}
