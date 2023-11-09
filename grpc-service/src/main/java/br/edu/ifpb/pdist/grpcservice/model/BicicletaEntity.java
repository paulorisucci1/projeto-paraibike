package br.edu.ifpb.pdist.grpcservice.model;


import br.com.paraibike.protofiles.Bicicleta;

import javax.persistence.*;

import lombok.Data;

import java.io.Serializable;

@Entity
@Table(name="bicicletas")
@Data
public class BicicletaEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String codigo;

    private String marca;

    private String estado;

    private Integer usuarioId;

    public void update(BicicletaEntity updatedBicicleta) {
        setCodigo(updatedBicicleta.getCodigo());
        setMarca(updatedBicicleta.getMarca());
        setEstado(updatedBicicleta.getEstado());
    }
}
