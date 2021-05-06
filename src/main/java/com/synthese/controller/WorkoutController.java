package com.synthese.controller;

import com.synthese.model.Workout;
import com.synthese.service.WorkoutService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/workouts")
public class WorkoutController {

    private WorkoutService workoutService;

    public WorkoutController(WorkoutService workoutService){
        this.workoutService = workoutService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Workout>> getAll(@RequestParam(required = false) String date) {
        return workoutService.getAll(date);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Workout> getById(@PathVariable("id") String id) {
        return workoutService.getById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<Workout> create(@RequestBody Workout workout) {
        return workoutService.create(workout);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") String id) {
        return workoutService.delete(id);
    }
}
