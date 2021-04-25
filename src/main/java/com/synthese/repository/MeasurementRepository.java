package com.synthese.repository;

import com.synthese.model.Measurement;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;

public interface MeasurementRepository extends MongoRepository<Measurement, String> {
    List<Measurement> findByCategory(String category);

    List<Measurement> findByDateEquals(LocalDate date);
}
