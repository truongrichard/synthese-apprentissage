package com.synthese.controller;

import com.synthese.model.Day;
import com.synthese.service.DayService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/days")
public class DayController {

    private DayService dayService;

    public DayController(DayService dayService){
        this.dayService = dayService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Day>> getAll(@RequestParam(required = false) String date) {
        return dayService.getAll(date);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Day> getById(@PathVariable("id") String id) {
        return dayService.getById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<Day> create(@RequestBody Day day) {
        return dayService.create(day);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") String id) {
        return dayService.delete(id);
    }
}
