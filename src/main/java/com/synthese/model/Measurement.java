package com.synthese.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "measurements")
public class Measurement {

    @Id
    private String id;

    private String title;
    private String description;
    private LocalDate date;
    private Exercise.Category category;

    public Measurement() {

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

    public Exercise.Category getCategory() { return category; }

    public void setCategory(Exercise.Category category) { this.category = category; }

    public enum Category {
        WEIGHT,
        FAT,
        NECK,
        SHOULDER,
        BICEP,
        FOREARM,
        CHEST,
        WAIST,
        HIP,
        THIGH,
        CALF
    }
}
