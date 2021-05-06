package com.synthese.repository;

import com.synthese.model.ImageExercise;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ImageExerciseRepository extends MongoRepository<ImageExercise, String> {
    Optional<ImageExercise> findByExerciseId(String id);
}
