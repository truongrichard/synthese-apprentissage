package com.synthese.controller;

import com.synthese.model.Measurement;
import com.synthese.service.MeasurementService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/measurements")
public class MeasurementController {

    private MeasurementService measurementService;

    public MeasurementController(MeasurementService measurementService){
        this.measurementService = measurementService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Measurement>> getAll(@RequestParam(required = false) String date) {
        return measurementService.getAll(date);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Measurement> getById(@PathVariable("id") String id) {
        return measurementService.getById(id);
    }

    @GetMapping("/getCategory/{category}")
    public ResponseEntity<List<Measurement>> getByCategory(@PathVariable("category") String category) {
        return measurementService.getByCategory(category);
    }

    @PostMapping("/create")
    public ResponseEntity<Measurement> create(@RequestBody Measurement measurement) {
        return measurementService.create(measurement);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") String id) {
        return measurementService.delete(id);
    }
}
