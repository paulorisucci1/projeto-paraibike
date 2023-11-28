package br.edu.ifpb.pdist.model;

import lombok.Data;

@Data
public class AluguelDTO {

    private Integer id;

    private String valor;

    private String data;

    private String status;

    private Integer quantidadeHoras;

    private Integer usuarioId;

    private BicicletaDTO bicicleta;
}
