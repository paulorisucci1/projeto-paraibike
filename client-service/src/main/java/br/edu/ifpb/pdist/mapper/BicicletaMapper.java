package br.edu.ifpb.pdist.mapper;

import br.com.paraibike.protofiles.Bicicleta;
import br.edu.ifpb.pdist.model.BicicletaResponse;

public class BicicletaMapper {

    public static BicicletaResponse createBicicletaResponseFrom(Bicicleta bicicleta) {
        BicicletaResponse bicicletaResponse = new BicicletaResponse();

        bicicletaResponse.setId(bicicleta.getId());
        bicicletaResponse.setCodigo(bicicleta.getCodigo());
        bicicletaResponse.setMarca(bicicleta.getMarca());
        bicicletaResponse.setEstado(bicicleta.getEstado());

        return bicicletaResponse;
    }

    public static Bicicleta createBicicletaFrom(BicicletaResponse bicicletaResponse) {

        return Bicicleta
                .newBuilder()
                .setId(bicicletaResponse.getId())
                .setCodigo(bicicletaResponse.getCodigo())
                .setMarca(bicicletaResponse.getMarca())
                .setEstado(bicicletaResponse.getEstado())
                .build();
    }
}
