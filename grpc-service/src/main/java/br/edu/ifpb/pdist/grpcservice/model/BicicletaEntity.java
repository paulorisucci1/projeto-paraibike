package br.edu.ifpb.pdist.grpcservice.model;


import br.com.paraibike.protofiles.Bicicleta;

import javax.persistence.*;

import lombok.Data;

@Entity
@Table(name="bicicletas")
@Data
public class BicicletaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String codigo;

    private String marca;

    private String estado;
}
