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

        if(aluguel.getId() != 0) {
            aluguelEntity.setId(aluguel.getId());
        }

        if(aluguel.getUsuarioId() != 0) {
            aluguelEntity.setUsuarioId(aluguel.getUsuarioId());
        }

        if(!aluguel.getData().isEmpty()) {
            aluguelEntity.setData(LocalDateTime.parse(aluguel.getData(), DateTimeFormatter.ISO_DATE_TIME));
        }

        if(aluguel.getQuantidadeHoras() != 0) {
            aluguelEntity.setQuantidadeHoras(aluguel.getQuantidadeHoras());
        }

        if(!aluguel.getStatus().isEmpty()) {
            aluguelEntity.setStatus(StatusAluguel.getStatusFromDescricao(aluguel.getStatus()));
        }

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
