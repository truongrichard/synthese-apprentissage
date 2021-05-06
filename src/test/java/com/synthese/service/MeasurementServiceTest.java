package com.synthese.service;

import com.synthese.model.Measurement;
import com.synthese.repository.MeasurementRepository;
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
class MeasurementServiceTest {

    @Autowired
    private MeasurementService measurementService;

    @MockBean
    private MeasurementRepository measurementRepository;

    Measurement mockMeasurement1;
    Measurement mockMeasurement2;
    Measurement mockMeasurement3;

    @BeforeEach
    void setUp() {
        mockMeasurement1 = new Measurement();
        mockMeasurement1.setId("1l");
        mockMeasurement1.setDate(LocalDate.now());
        measurementRepository.save(mockMeasurement1);

        mockMeasurement2 = new Measurement();
        mockMeasurement2.setId("2l");
        mockMeasurement1.setDate(LocalDate.now().plusDays(1));
        measurementRepository.save(mockMeasurement2);

        mockMeasurement3 = new Measurement();
        mockMeasurement3.setId("3l");
        mockMeasurement1.setDate(LocalDate.now().plusDays(3));
    }

    @Test
    void getAll() {
        // Arrange
        doReturn(Arrays.asList(mockMeasurement1, mockMeasurement2)).when(measurementRepository).findAll();
        // Act
        ResponseEntity<List<Measurement>> measurements = measurementService.getAll(null);
        // Assert
        Assertions.assertNotNull(measurements.getBody());
        Assertions.assertEquals(HttpStatus.OK, measurements.getStatusCode());
        Assertions.assertEquals(2, measurements.getBody().size());
    }

    @Test
    void getAllDateFound() {
        // Arrange
        when(measurementRepository.findByDateEquals(mockMeasurement1.getDate())).thenReturn(Collections.singletonList(mockMeasurement1));
        doReturn(Arrays.asList(mockMeasurement1, mockMeasurement2)).when(measurementRepository).findAll();
        // Act
        ResponseEntity<List<Measurement>> measurements = measurementService.getAll(mockMeasurement1.getDate().toString());
        // Assert
        Assertions.assertNotNull(measurements.getBody());
        Assertions.assertEquals(HttpStatus.OK, measurements.getStatusCode());
        Assertions.assertEquals(1, measurements.getBody().size());
    }

    @Test
    void getAllDateNotFound() {
        // Arrange
        List<Measurement> emptyList = new ArrayList<>();
        when(measurementRepository.findByDateEquals(LocalDate.now().minusDays(1))).thenReturn(emptyList);
        doReturn(Arrays.asList("")).when(measurementRepository).findAll();
        // Act
        ResponseEntity<List<Measurement>> measurements = measurementService.getAll(LocalDate.now().minusDays(1).toString());
        // Assert
        Assertions.assertNull(measurements.getBody());
        Assertions.assertEquals(HttpStatus.NO_CONTENT, measurements.getStatusCode());
    }


    @Test
    void getById() {
        // Arrange
        doReturn(Optional.of(mockMeasurement1)).when(measurementRepository).findById(mockMeasurement1.getId());
        // Act
        ResponseEntity<Measurement> measurements = measurementService.getById(mockMeasurement1.getId());
        // Assert
        Assertions.assertNotNull(measurements.getBody());
        Assertions.assertEquals(HttpStatus.OK, measurements.getStatusCode());
        Assertions.assertEquals(mockMeasurement1.getId(), measurements.getBody().getId());
    }

    @Test
    void getByIdNotFound() {
        // Arrange
        doReturn(Optional.empty()).when(measurementRepository).findById("100l");
        // Act
        ResponseEntity<Measurement> measurements = measurementService.getById("100l");
        // Assert
        Assertions.assertNull(measurements.getBody());
        Assertions.assertEquals(HttpStatus.NOT_FOUND, measurements.getStatusCode());
    }

    @Test
    void create() {
        // Arrange
        when(measurementRepository.save(mockMeasurement3)).thenReturn(mockMeasurement3);
        doReturn(mockMeasurement3).when(measurementRepository).save(any());
        // Act
        ResponseEntity<Measurement> measurements = measurementService.create(mockMeasurement3);
        // Assert
        Assertions.assertNotNull(measurements);
        Assertions.assertEquals(HttpStatus.CREATED, measurements.getStatusCode());
        Assertions.assertEquals(mockMeasurement3.getDate(), measurements.getBody().getDate());
    }

    @Test
    void delete() {

        measurementService.delete(mockMeasurement1.getId());

        verify(measurementRepository, times(1)).deleteById(eq(mockMeasurement1.getId()));
    }
}