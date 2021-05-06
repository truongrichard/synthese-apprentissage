package com.synthese.service;

import com.synthese.model.Workout;
import com.synthese.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WorkoutService {

    @Autowired
    private WorkoutRepository workoutRepository;

    public WorkoutService(WorkoutRepository workoutRepository){
        this.workoutRepository = workoutRepository;
    }

    public ResponseEntity<List<Workout>> getAll(String date) {
        try {
            List<Workout> workouts = new ArrayList<Workout>();

            if (date == null)
                workoutRepository.findAll().forEach(workouts::add);
            else {
                LocalDate localDate = LocalDate.parse(date);
                workoutRepository.findByDateEquals(localDate).forEach(workouts::add);
            }

            if (workouts.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>(workouts, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Workout> getById(String id) {
        Optional<Workout> workoutOptional = workoutRepository.findById(id);

        if (workoutOptional.isPresent()) {
            return new ResponseEntity<>(workoutOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<Workout> create(Workout workout) {
        try {
            Workout newWorkout = workoutRepository.save(workout);
            return new ResponseEntity<>(newWorkout, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<HttpStatus> delete(String id) {
        try {
            workoutRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
