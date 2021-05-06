package com.synthese.service;

import com.synthese.model.Measurement;
import com.synthese.repository.MeasurementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MeasurementService {

    @Autowired
    private MeasurementRepository measurementRepository;

    public MeasurementService(MeasurementRepository measurementRepository){
        this.measurementRepository = measurementRepository;
    }

    public ResponseEntity<List<Measurement>> getAll(String date) {
        try {
            List<Measurement> measurements = new ArrayList<Measurement>();

            if (date == null)
                measurementRepository.findAll().forEach(measurements::add);
            else {
                LocalDate localDate = LocalDate.parse(date);
                measurementRepository.findByDateEquals(localDate).forEach(measurements::add);
            }

            if (measurements.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>(measurements, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Measurement> getById(String id) {
        Optional<Measurement> optionalMeasurement = measurementRepository.findById(id);

        if (optionalMeasurement.isPresent()) {
            return new ResponseEntity<>(optionalMeasurement.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<List<Measurement>> getByCategory(String category) {
        try {
            List<Measurement> measurements = new ArrayList<Measurement>();

            measurementRepository.findByCategory(category).forEach(measurements::add);

            if (measurements.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>(measurements, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Measurement> create(Measurement measurement) {
        try {
            Measurement newMeasurement = measurementRepository.save(measurement);
            return new ResponseEntity<>(newMeasurement, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<HttpStatus> delete(String id) {
        try {
            measurementRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
