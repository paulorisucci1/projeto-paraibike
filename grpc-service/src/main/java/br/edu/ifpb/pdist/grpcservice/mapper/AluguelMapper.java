package br.edu.ifpb.pdist.grpcservice.mapper;

import br.com.paraibike.protofiles.Aluguel;
import br.edu.ifpb.pdist.grpcservice.model.AluguelEntity;
import br.edu.ifpb.pdist.grpcservice.model.StatusAluguel;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class AluguelMapper {

    public static AluguelEntity createAluguelEntityFrom(Aluguel aluguel) {
        AluguelEntity aluguelEntity = new AluguelEntity();

        aluguelEntity.setId(aluguel.getId());
        aluguelEntity.setUsuarioId(aluguelEntity.getUsuarioId());
        aluguelEntity.setBicicleta(BicicletaMapper.createBicicletaEntityFrom(aluguel.getBicicleta()));
        aluguelEntity.setData(LocalDateTime.parse(aluguel.getData(), DateTimeFormatter.ISO_DATE_TIME));
        aluguelEntity.setValor(new BigDecimal(aluguel.getValor()));
        aluguelEntity.setStatus(StatusAluguel.getStatusFromDescricao(aluguel.getStatus()));

        return aluguelEntity;
    }

    public static Aluguel createAluguelFrom(AluguelEntity aluguelEntity) {
        return Aluguel.newBuilder()
                .setId(aluguelEntity.getId())
                .setUsuarioId(aluguelEntity.getUsuarioId())
                .setBicicleta(BicicletaMapper.createBicicletaFrom(aluguelEntity.getBicicleta()))
                .setData(String.valueOf(aluguelEntity.getData()))
                .setValor(String.valueOf(aluguelEntity.getValor()))
                .setStatus(aluguelEntity.getStatus().getDescricao())
                .build();
    }
}
