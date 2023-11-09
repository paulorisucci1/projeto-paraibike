package br.edu.ifpb.pdist.mapper;

import br.com.paraibike.protofiles.Aluguel;
import br.edu.ifpb.pdist.model.AluguelDTO;

public class AluguelMapper {

    public static AluguelDTO createAluguelDTOrom(Aluguel aluguel) {
        AluguelDTO aluguelEntity = new AluguelDTO();

        aluguelEntity.setId(aluguel.getId());
        aluguelEntity.setUsuarioId(aluguelEntity.getUsuarioId());
        aluguelEntity.setBicicletaDTO(BicicletaMapper.createBicicletaDTOFrom(aluguel.getBicicleta()));
        aluguelEntity.setData(aluguel.getData());
        aluguelEntity.setValor(aluguel.getValor());
        aluguelEntity.setStatus(aluguel.getStatus());

        return aluguelEntity;
    }

    public static Aluguel createAluguelFrom(AluguelDTO aluguelDTO) {
        return Aluguel.newBuilder()
                .setId(aluguelDTO.getId())
                .setUsuarioId(aluguelDTO.getUsuarioId())
                .setBicicleta(BicicletaMapper.createBicicletaFrom(aluguelDTO.getBicicletaDTO()))
                .setData(String.valueOf(aluguelDTO.getData()))
                .setValor(String.valueOf(aluguelDTO.getValor()))
                .setStatus(aluguelDTO.getStatus())
                .build();
    }
}
