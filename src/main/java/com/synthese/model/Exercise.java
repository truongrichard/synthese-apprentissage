package com.synthese.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "exercises")
public class Exercise {

  @Id
  private String id;

  private String title;
  private String description;

  private BodyPart bodyPart;
  private Category category;

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
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

  public BodyPart getBodyPart() { return bodyPart; }

  public void setBodyPart(BodyPart bodyPart) {
    this.bodyPart = bodyPart;
  }

  public Category getCategory() { return category; }

  public void setCategory(Category category) { this.category = category; }

  public enum BodyPart {
    ARM,
    CHEST,
    STOMACH,
    SHOULDER,
    BACK,
    LEG
  }

  public enum Category {
    BARBELL,
    DUMBBELL,
    BODYWEIGHT,
    CARDIO,
    DURATION,
    MACHINE
  }
}
