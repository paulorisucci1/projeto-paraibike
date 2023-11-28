package br.edu.ifpb.pdist.grpcservice.model;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "alugueis")
public class AluguelEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer quantidadeHoras;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime data;

    private StatusAluguel status;

    private Integer usuarioId;

    private BigDecimal valor;

    @OneToOne
    private BicicletaEntity bicicleta;

    public void updateFrom(AluguelEntity updatedAluguel) {
        setQuantidadeHoras(updatedAluguel.getQuantidadeHoras());
        setData(updatedAluguel.getData());
        setStatus(updatedAluguel.getStatus());
    }

    public void addValor() {
        valor = bicicleta
                .getValorPorHora()
                .multiply(BigDecimal.valueOf(quantidadeHoras));
    }
}
