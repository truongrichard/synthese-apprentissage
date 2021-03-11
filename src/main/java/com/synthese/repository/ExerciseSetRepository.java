package com.synthese.repository;

import com.synthese.model.ExerciseSet;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ExerciseSetRepository extends MongoRepository<ExerciseSet, String> {

}