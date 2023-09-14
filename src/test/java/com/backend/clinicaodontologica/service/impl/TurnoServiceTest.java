package com.backend.clinicaodontologica.service.impl;

import com.backend.clinicaodontologica.dto.entrada.modificacion.TurnoModificacionEntradaDto;
import com.backend.clinicaodontologica.dto.entrada.odontologo.OdontologoEntradaDto;
import com.backend.clinicaodontologica.dto.entrada.paciente.DomicilioEntradaDto;
import com.backend.clinicaodontologica.dto.entrada.paciente.PacienteEntradaDto;
import com.backend.clinicaodontologica.dto.entrada.turno.TurnoEntradaDto;
import com.backend.clinicaodontologica.dto.salida.odontologo.OdontologoSalidaDto;
import com.backend.clinicaodontologica.dto.salida.paciente.PacienteSalidaDto;
import com.backend.clinicaodontologica.dto.salida.turno.TurnoSalidaDto;
import com.backend.clinicaodontologica.exceptions.BadRequestException;
import com.backend.clinicaodontologica.exceptions.ResourceNotFoundException;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)

@TestPropertySource(locations = "classpath:application-test.properties")

class TurnoServiceTest {
    @Autowired
    private TurnoService turnoService;
    @Autowired
    private PacienteService pacienteService;
    @Autowired
   private OdontologoService odontologoService;


    @Test
   @Order(1)
    void deberiaCrearUnTurnoConIdPaciente1() throws BadRequestException, ResourceNotFoundException {


        PacienteEntradaDto pacienteEntradaDto =new PacienteEntradaDto("juan","Perez",111111, LocalDate.of(2023,12,9),new DomicilioEntradaDto("calle",1232,"localidad","provincia"));
        PacienteSalidaDto pacienteSalidaDto =pacienteService.registrarPaciente(pacienteEntradaDto);


        OdontologoEntradaDto odontologoEntradaDto = new OdontologoEntradaDto("AZ-1243434","Pablito","Morales");
        OdontologoSalidaDto odontologoSalidaDto = odontologoService.registrarOdontologo(odontologoEntradaDto);

        TurnoEntradaDto turnoEntradaDto=new TurnoEntradaDto(pacienteSalidaDto.getId(),odontologoSalidaDto.getId(), LocalDateTime.of(2023,12,12,10,50));
        TurnoSalidaDto turnoSalidaDto= turnoService.registrarTurno(turnoEntradaDto);
        assertEquals(1L,turnoSalidaDto.getId());
        System.out.println("este es el id del turno creado"+turnoSalidaDto.getId());


    }
    @Test
    @Order(2)
    void deberiaBuscarUnTurnoConElId1() throws ResourceNotFoundException {
        TurnoSalidaDto turnoSalidaDto=turnoService.buscarTurnoPorId(1L);
        System.out.println("imprimiendoId");
        System.out.println(turnoSalidaDto.getId());
        assertEquals(1L, turnoSalidaDto.getId());

    }



    @Test
    @Order(3)
    void deberiaModificarLaHoraDelTurnoConId1Alas12Y50() throws ResourceNotFoundException {

        TurnoModificacionEntradaDto turnoModificacionEntradaDto = new TurnoModificacionEntradaDto(1L,1L,1L,LocalDateTime.of(2023,12,12,12,50));
        TurnoSalidaDto turnoSalidaDto= turnoService.modificarTurno(turnoModificacionEntradaDto);
        assertEquals(LocalDateTime.of(2023,12,12,12,50),turnoSalidaDto.getFechaYHora());

    }


}