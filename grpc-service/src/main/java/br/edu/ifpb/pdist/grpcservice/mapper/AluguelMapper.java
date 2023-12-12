package br.edu.ifpb.pdist.grpcservice.mapper;

import br.com.paraibike.protofiles.Aluguel;
import br.edu.ifpb.pdist.grpcservice.model.AluguelEntity;
import br.edu.ifpb.pdist.grpcservice.model.StatusAluguel;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static br.edu.ifpb.pdist.grpcservice.mapper.BicicletaMapper.*;

public class AluguelMapper {

    public static AluguelEntity createAluguelEntityFrom(Aluguel aluguel) {
        AluguelEntity aluguelEntity = new AluguelEntity();

        aluguelEntity.setId(aluguel.getId());
        aluguelEntity.setUsuarioId(aluguel.getUsuarioId());
        aluguelEntity.setBicicleta(createBicicletaEntityForAluguel(aluguel.getBicicleta()));
        aluguelEntity.setData(LocalDateTime.parse(aluguel.getData(), DateTimeFormatter.ISO_DATE_TIME));
        aluguelEntity.setQuantidadeHoras(aluguel.getQuantidadeHoras());
        aluguelEntity.setStatus(StatusAluguel.getStatusFromDescricao(aluguel.getStatus()));
        aluguelEntity.addValor();

        return aluguelEntity;
    }

    public static Aluguel createAluguelFrom(AluguelEntity aluguelEntity) {
        return Aluguel.newBuilder()
                .setId(aluguelEntity.getId())
                .setUsuarioId(aluguelEntity.getUsuarioId())
                .setBicicleta(createBicicletaFrom(aluguelEntity.getBicicleta()))
                .setData(String.valueOf(aluguelEntity.getData()))
                .setQuantidadeHoras(aluguelEntity.getQuantidadeHoras())
                .setStatus(aluguelEntity.getStatus().getDescricao())
                .setValor(String.valueOf(aluguelEntity.getValor()))
                .build();
    }
}
