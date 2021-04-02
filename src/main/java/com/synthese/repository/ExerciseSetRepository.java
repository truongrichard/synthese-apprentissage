package com.synthese.repository;

import com.synthese.model.ExerciseSet;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;

public interface ExerciseSetRepository extends MongoRepository<ExerciseSet, String> {
    List<ExerciseSet> findAllByWorkoutId(String id);
}