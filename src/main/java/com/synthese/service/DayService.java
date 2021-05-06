package com.synthese.service;

import com.synthese.model.Day;
import com.synthese.repository.DayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DayService {

    @Autowired
    private DayRepository dayRepository;

    public DayService(DayRepository dayRepository){
        this.dayRepository = dayRepository;
    }

    public ResponseEntity<List<Day>> getAll(String date) {
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

    public ResponseEntity<Day> getById(String id) {
        Optional<Day> dayOptional = dayRepository.findById(id);

        if (dayOptional.isPresent()) {
            return new ResponseEntity<>(dayOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<Day> create(Day day) {
        try {
            Day newDay = dayRepository.save(day);
            return new ResponseEntity<>(newDay, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<HttpStatus> delete(String id) {
        try {
            dayRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
