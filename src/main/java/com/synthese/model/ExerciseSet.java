package com.synthese.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Duration;

@Document(collection = "exercises_sets")
public class ExerciseSet {
    @Id
    private String id;

    private int repetitions;
    private double weight;
    private Duration duration;

    public ExerciseSet() {

    }

    public String getId() {
        return id;
    }

    public int getRepetitions() {
        return repetitions;
    }

    public void setRepetitions(int repetitions) {
        this.repetitions = repetitions;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public Duration getDuration() { return duration; }

    public void setDuration(Duration duration) { this.duration = duration; }
}
