package br.edu.ifpb.pdist.mapper;

import br.com.paraibike.protofiles.Bicicleta;
import br.edu.ifpb.pdist.model.BicicletaDTO;

public class BicicletaMapper {

    public static BicicletaDTO createBicicletaDTOFrom(Bicicleta bicicleta) {
        BicicletaDTO bicicletaDTO = new BicicletaDTO();

        bicicletaDTO.setId(bicicleta.getId());
        bicicletaDTO.setCodigo(bicicleta.getCodigo());
        bicicletaDTO.setMarca(bicicleta.getMarca());
        bicicletaDTO.setEstado(bicicleta.getEstado());
        bicicletaDTO.setUsuarioId(bicicleta.getUsuarioId());

        return bicicletaDTO;
    }

    public static Bicicleta createBicicletaFrom(BicicletaDTO bicicletaDTO) {

        return Bicicleta
                .newBuilder()
                .setId(bicicletaDTO.getId())
                .setCodigo(bicicletaDTO.getCodigo())
                .setMarca(bicicletaDTO.getMarca())
                .setEstado(bicicletaDTO.getEstado())
                .setUsuarioId(bicicletaDTO.getUsuarioId())
                .build();
    }
}
