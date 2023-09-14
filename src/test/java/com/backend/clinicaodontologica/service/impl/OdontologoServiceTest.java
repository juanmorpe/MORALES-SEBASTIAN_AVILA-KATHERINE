package com.backend.clinicaodontologica.service.impl;

import com.backend.clinicaodontologica.dto.entrada.odontologo.OdontologoEntradaDto;
import com.backend.clinicaodontologica.dto.entrada.paciente.DomicilioEntradaDto;
import com.backend.clinicaodontologica.dto.entrada.paciente.PacienteEntradaDto;
import com.backend.clinicaodontologica.dto.salida.odontologo.OdontologoSalidaDto;
import com.backend.clinicaodontologica.dto.salida.paciente.PacienteSalidaDto;
import com.backend.clinicaodontologica.exceptions.ResourceNotFoundException;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)

@TestPropertySource(locations = "classpath:application-test.properties")

class OdontologoServiceTest {
    @Autowired
    private OdontologoService odontologoService;

    @Test
    @Order(1)

    public void deberiaRegistrarUnOdontologoDondeNoRetorneNull(){

        OdontologoEntradaDto odontologoEntradaDto=new OdontologoEntradaDto("783867894","Pedro","Polo");
        OdontologoSalidaDto odontologoSalidaDto =odontologoService.registrarOdontologo(odontologoEntradaDto);
        assertNotNull(odontologoSalidaDto);

    }

    @Test
    @Order(2)
    void alIntentarEliminarUnOdontologoYaEliminado_deberiaLanzarseUnResourceNotFoundException() {
        try {
            odontologoService.eliminarOdontologo(1L);
        } catch (Exception e) {
            e.printStackTrace();
        }
        assertThrows(ResourceNotFoundException.class, () -> odontologoService.eliminarOdontologo(1L));
    }

        @Test
        @Order(3)
        void alIntentarBuscarUnOdontologoEliminado_deberiaLanzarseUnResourceNotFoundException(){

            assertThrows(ResourceNotFoundException.class, () -> odontologoService.buscarOdontologoPorId(1L));
    }







}