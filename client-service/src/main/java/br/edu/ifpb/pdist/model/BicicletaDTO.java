package br.edu.ifpb.pdist.model;


import lombok.Data;

@Data
public class BicicletaDTO {

    private Integer id;

    private String codigo;

    private String marca;

    private String estado;

    private Integer usuarioId;
}
