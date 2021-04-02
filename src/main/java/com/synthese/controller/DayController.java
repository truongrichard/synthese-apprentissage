package com.synthese.controller;

import com.synthese.model.Day;
import com.synthese.repository.DayRepository;
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
@RequestMapping("/days")
public class DayController {

    @Autowired
    private DayRepository dayRepository;

    @GetMapping("/getAll")
    public ResponseEntity<List<Day>> getAll(@RequestParam(required = false) String date) {
        try {
            List<Day> days = new ArrayList<Day>();
            if (date == null)
                dayRepository.findAll().forEach(days::add);
            else{
                LocalDate localDate = LocalDate.parse(date);
                dayRepository.findByDateEquals(localDate).forEach(days::add);
            }

            if (days.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>(days, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Day> getById(@PathVariable("id") String id) {
        Optional<Day> dayOptional = dayRepository.findById(id);

        if (dayOptional.isPresent()) {
            return new ResponseEntity<>(dayOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Day> create(@RequestBody Day day) {
        try {
            Day newDay = dayRepository.save(day);
            return new ResponseEntity<>(newDay, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") String id) {
        try {
            dayRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deleteAll")
    public ResponseEntity<HttpStatus> deleteAll() {
        try {
            dayRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
