package com.synthese.service;

import com.synthese.model.Workout;
import com.synthese.repository.WorkoutRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDate;
import java.util.*;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

@ActiveProfiles("test")
@ExtendWith(SpringExtension.class)
@SpringBootTest
class WorkoutServiceTest {

    @Autowired
    private WorkoutService workoutService;

    @MockBean
    private WorkoutRepository workoutRepository;

    Workout mockWorkout1;
    Workout mockWorkout2;
    Workout mockWorkout3;

    @BeforeEach
    void setUp() {
        mockWorkout1 = new Workout();
        mockWorkout1.setId("1l");
        mockWorkout1.setDate(LocalDate.now());
        workoutRepository.save(mockWorkout1);

        mockWorkout2 = new Workout();
        mockWorkout2.setId("2l");
        mockWorkout1.setDate(LocalDate.now().plusDays(1));
        workoutRepository.save(mockWorkout2);

        mockWorkout3 = new Workout();
        mockWorkout3.setId("3l");
        mockWorkout1.setDate(LocalDate.now().plusDays(3));
    }

    @Test
    void getAll() {
        // Arrange
        doReturn(Arrays.asList(mockWorkout1, mockWorkout2)).when(workoutRepository).findAll();
        // Act
        ResponseEntity<List<Workout>> workouts = workoutService.getAll(null);
        // Assert
        Assertions.assertNotNull(workouts.getBody());
        Assertions.assertEquals(HttpStatus.OK, workouts.getStatusCode());
        Assertions.assertEquals(2, workouts.getBody().size());
    }

    @Test
    void getAllDateFound() {
        // Arrange
        when(workoutRepository.findByDateEquals(mockWorkout1.getDate())).thenReturn(Collections.singletonList(mockWorkout1));
        doReturn(Arrays.asList(mockWorkout1, mockWorkout2)).when(workoutRepository).findAll();
        // Act
        ResponseEntity<List<Workout>> workouts = workoutService.getAll(mockWorkout1.getDate().toString());
        // Assert
        Assertions.assertNotNull(workouts.getBody());
        Assertions.assertEquals(HttpStatus.OK, workouts.getStatusCode());
        Assertions.assertEquals(1, workouts.getBody().size());
    }

    @Test
    void getAllDateNotFound() {
        // Arrange
        List<Workout> emptyList = new ArrayList<>();
        when(workoutRepository.findByDateEquals(LocalDate.now().minusDays(1))).thenReturn(emptyList);
        doReturn(Arrays.asList("")).when(workoutRepository).findAll();
        // Act
        ResponseEntity<List<Workout>> workouts = workoutService.getAll(LocalDate.now().minusDays(1).toString());
        // Assert
        Assertions.assertNull(workouts.getBody());
        Assertions.assertEquals(HttpStatus.NO_CONTENT, workouts.getStatusCode());
    }


    @Test
    void getById() {
        // Arrange
        doReturn(Optional.of(mockWorkout1)).when(workoutRepository).findById(mockWorkout1.getId());
        // Act
        ResponseEntity<Workout> workout = workoutService.getById(mockWorkout1.getId());
        // Assert
        Assertions.assertNotNull(workout.getBody());
        Assertions.assertEquals(HttpStatus.OK, workout.getStatusCode());
        Assertions.assertEquals(mockWorkout1.getId(), workout.getBody().getId());
    }

    @Test
    void getByIdNotFound() {
        // Arrange
        doReturn(Optional.empty()).when(workoutRepository).findById("100l");
        // Act
        ResponseEntity<Workout> workout = workoutService.getById("100l");
        // Assert
        Assertions.assertNull(workout.getBody());
        Assertions.assertEquals(HttpStatus.NOT_FOUND, workout.getStatusCode());
    }

    @Test
    void create() {
        // Arrange
        when(workoutRepository.save(mockWorkout3)).thenReturn(mockWorkout3);
        doReturn(mockWorkout3).when(workoutRepository).save(any());
        // Act
        ResponseEntity<Workout> workout = workoutService.create(mockWorkout3);
        // Assert
        Assertions.assertNotNull(workout);
        Assertions.assertEquals(HttpStatus.CREATED, workout.getStatusCode());
        Assertions.assertEquals(mockWorkout3.getDate(), workout.getBody().getDate());
    }

    @Test
    void delete() {

        workoutService.delete(mockWorkout1.getId());

        verify(workoutRepository, times(1)).deleteById(eq(mockWorkout1.getId()));
    }
}