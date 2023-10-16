package br.edu.ifpb.pdist.grpcservice.model;


import br.com.paraibike.protofiles.Bicicleta;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Data;

@Entity
@Data
public class BicicletaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String codigo;

    private String marca;

    private String estado;
}
