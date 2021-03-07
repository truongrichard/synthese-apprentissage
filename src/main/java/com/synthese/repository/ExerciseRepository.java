package com.synthese.repository;

import com.synthese.model.Exercise;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ExerciseRepository extends MongoRepository<Exercise, String> {
    List<Exercise> findByTitleContainingIgnoreCase(String title);
}
