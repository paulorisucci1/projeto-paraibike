package br.edu.ifpb.pdist.grpcservice.mapper;

import br.com.paraibike.protofiles.Bicicleta;
import br.edu.ifpb.pdist.grpcservice.model.BicicletaEntity;

public class BicicletaMapper {

    public static BicicletaEntity createBicicletaEntityFrom(Bicicleta bicicleta) {
        BicicletaEntity bicicletaEntity = new BicicletaEntity();

        bicicletaEntity.setId(bicicleta.getId());
        bicicletaEntity.setCodigo(bicicleta.getCodigo());
        bicicletaEntity.setMarca(bicicleta.getMarca());
        bicicletaEntity.setEstado(bicicleta.getEstado());

        return bicicletaEntity;
    }

    public static Bicicleta createBicicletaFrom(BicicletaEntity bicicletaEntity) {

        return Bicicleta
                .newBuilder()
                .setId(bicicletaEntity.getId())
                .setCodigo(bicicletaEntity.getCodigo())
                .setMarca(bicicletaEntity.getMarca())
                .setEstado(bicicletaEntity.getEstado())
                .build();
    }
}
