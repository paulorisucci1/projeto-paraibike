package br.edu.ifpb.pdist.mapper;

import br.com.paraibike.protofiles.Aluguel;
import br.edu.ifpb.pdist.model.AluguelDTO;

public class AluguelMapper {

    public static AluguelDTO createAluguelDTOrom(Aluguel aluguel) {
        AluguelDTO aluguelDTO = new AluguelDTO();

        aluguelDTO.setId(aluguel.getId());
        aluguelDTO.setUsuarioId(aluguel.getUsuarioId());
        aluguelDTO.setBicicleta(BicicletaMapper.createBicicletaDTOFrom(aluguel.getBicicleta()));
        aluguelDTO.setData(aluguel.getData());
        aluguelDTO.setQuantidadeHoras(aluguel.getQuantidadeHoras());
        aluguelDTO.setStatus(aluguel.getStatus());
        aluguelDTO.setValor(aluguel.getValor());

        return aluguelDTO;
    }

    public static Aluguel createAluguelFrom(AluguelDTO aluguelDTO) {
        return Aluguel.newBuilder()
                .setId(aluguelDTO.getId())
                .setUsuarioId(aluguelDTO.getUsuarioId())
                .setBicicleta(BicicletaMapper.createBicicletaFrom(aluguelDTO.getBicicleta()))
                .setData(String.valueOf(aluguelDTO.getData()))
                .setQuantidadeHoras(aluguelDTO.getQuantidadeHoras())
                .setStatus(aluguelDTO.getStatus())
                .build();
    }
}
