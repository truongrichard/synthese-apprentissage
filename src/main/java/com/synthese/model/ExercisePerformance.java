package com.synthese.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Duration;

@Document(collection = "exercises_performances")
public class ExercisePerformance {
    @Id
    private String id;

    private Exercise exercise;
    private int sets;
    private int repetitions;
    private double weight;
    private Duration duration;

    public ExercisePerformance() {

    }

    public String getId() {
        return id;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }

    public int getSets() {
        return sets;
    }

    public void setSets(int sets) {
        this.sets = sets;
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
