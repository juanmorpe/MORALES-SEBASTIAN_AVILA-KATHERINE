package com.backend.clinicaodontologica.dto.entrada.modificacion;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TurnoModificacionEntradaDto {

    @NotNull(message = "Debe proveerse el id del turno que se desea modificar")
    private Long id;
    @NotNull(message = "El paciente no puede ser nulo")
    private Long PacienteId;
    @NotNull(message = "El odontologo no puede ser nulo")
    private Long OdontologoId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    @FutureOrPresent(message = "La fecha no puede ser anterior al día de hoy")
    @NotNull(message = "Debe especificarse la fecha y hora del turno")
    private LocalDateTime fechaYHora;

    public TurnoModificacionEntradaDto() {
    }

    public TurnoModificacionEntradaDto(Long id, Long PacienteId, Long OdontologoId, LocalDateTime fechaYHora) {
        this.id = id;
        this.PacienteId = PacienteId;
        this.OdontologoId = OdontologoId;
        this.fechaYHora = fechaYHora;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public Long getPacienteId() {
        return PacienteId;
    }

    public void setPacienteId(Long PacienteId) {
        this.PacienteId = PacienteId;
    }

    public Long getOdontologoId() {
        return OdontologoId;
    }

    public void setOdontologoId(Long OdontologoId) {
        this.OdontologoId = OdontologoId;
    }

    public LocalDateTime getFechaYHora() {
        return fechaYHora;
    }

    public void setFechaYHora(LocalDateTime fechaYHora) {
        this.fechaYHora = fechaYHora;
    }
}
