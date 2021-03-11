package com.synthese.repository;

import com.synthese.model.Day;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DayRepository extends MongoRepository<Day, String> {
    List<Day> findByDateEquals(String title);
}
