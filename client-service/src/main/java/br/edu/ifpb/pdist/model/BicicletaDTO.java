package br.edu.ifpb.pdist.model;


import lombok.Data;

import java.io.Serializable;

@Data
public class BicicletaDTO implements Serializable {

    private Integer id;

    private String codigo;

    private String marca;

    private String estado;

    private String valorPorHora;

    private Integer usuarioId;
}
