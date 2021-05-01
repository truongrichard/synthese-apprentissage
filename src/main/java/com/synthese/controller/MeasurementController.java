package com.synthese.controller;

import com.synthese.model.Measurement;
import com.synthese.repository.MeasurementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/measurements")
public class MeasurementController {

    @Autowired
    private MeasurementRepository measurementRepository;

    @GetMapping("/getAll")
    public ResponseEntity<List<Measurement>> getAll(@RequestParam(required = false) String date) {
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

    @GetMapping("/get/{id}")
    public ResponseEntity<Measurement> getById(@PathVariable("id") String id) {
        Optional<Measurement> optionalMeasurement = measurementRepository.findById(id);

        if (optionalMeasurement.isPresent()) {
            return new ResponseEntity<>(optionalMeasurement.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getCategory/{category}")
    public ResponseEntity<List<Measurement>> getByCategory(@PathVariable("category") String category) {
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

    @PostMapping("/create")
    public ResponseEntity<Measurement> create(@RequestBody Measurement measurement) {
        try {
            Measurement newMeasurement = measurementRepository.save(measurement);
            return new ResponseEntity<>(newMeasurement, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") String id) {
        try {
            measurementRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deleteAll")
    public ResponseEntity<HttpStatus> deleteAll() {
        try {
            measurementRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
