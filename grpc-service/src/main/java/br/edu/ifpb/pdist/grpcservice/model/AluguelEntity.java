package br.edu.ifpb.pdist.grpcservice.model;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
public class AluguelEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    private BicicletaEntity bicicleta;

    @OneToOne
    private UsuarioEntity usuario;

    private BigDecimal valor;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime data;

    private StatusAluguel status;

    public void updateFrom(AluguelEntity updatedAluguel) {
        setValor(updatedAluguel.getValor());
        setData(updatedAluguel.getData());
        setStatus(updatedAluguel.getStatus());
    }
}
