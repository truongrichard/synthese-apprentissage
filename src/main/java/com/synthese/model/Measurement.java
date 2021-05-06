package com.synthese.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "measurements")
public class Measurement {

    @Id
    private String id;

    private String value;
    private LocalDate date;
    private Category category;

    public Measurement() {

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Category getCategory() { return category; }

    public void setCategory(Category category) { this.category = category; }

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
