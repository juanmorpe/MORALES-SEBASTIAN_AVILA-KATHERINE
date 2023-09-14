package com.backend.clinicaodontologica.service.impl;

import com.backend.clinicaodontologica.dto.entrada.paciente.DomicilioEntradaDto;
import com.backend.clinicaodontologica.dto.entrada.paciente.PacienteEntradaDto;
import com.backend.clinicaodontologica.dto.salida.paciente.PacienteSalidaDto;

import com.backend.clinicaodontologica.exceptions.ResourceNotFoundException;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")

public class PacienteServiceTest {
@Autowired
private PacienteService pacienteService;

    @Test
    @Order(1)

    public void deberiaInsertarUnPacienteConNombreJuanConId1(){

        PacienteEntradaDto pacienteEntradaDto =new PacienteEntradaDto("juan","Perez",111111,LocalDate.of(2023,12,9),new DomicilioEntradaDto("calle",1232,"localidad","provincia"));

        PacienteSalidaDto pacienteSalidaDto =pacienteService.registrarPaciente(pacienteEntradaDto);
        assertEquals("juan",pacienteSalidaDto.getNombre());

    }

    @Test
    @Order(2)
    public void deberiaRetornarUnaListaNoVaciaDePaciente(){
    assertTrue(pacienteService.listarPacientes().size()> 0);

    }

    @Test
    @Order(3)
    void alIntentarEliminarUnPacienteYaEliminado_deberiaLanzarseUnResourceNotFoundException(){
        try{
            pacienteService.eliminarPaciente(1L);
        } catch (Exception e){
            e.printStackTrace();
        }
        assertThrows(ResourceNotFoundException.class, () -> pacienteService.eliminarPaciente(1L));
    }




    }


