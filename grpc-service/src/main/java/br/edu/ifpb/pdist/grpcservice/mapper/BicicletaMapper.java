package br.edu.ifpb.pdist.grpcservice.mapper;

import br.com.paraibike.protofiles.Aluguel;
import br.com.paraibike.protofiles.Bicicleta;
import br.edu.ifpb.pdist.grpcservice.model.AluguelEntity;
import br.edu.ifpb.pdist.grpcservice.model.BicicletaEntity;

import java.math.BigDecimal;

public class BicicletaMapper {

    public static BicicletaEntity createBicicletaEntityFrom(Bicicleta bicicleta) {
        BicicletaEntity bicicletaEntity = new BicicletaEntity();

        bicicletaEntity.setId(bicicleta.getId());
        bicicletaEntity.setCodigo(bicicleta.getCodigo());
        bicicletaEntity.setMarca(bicicleta.getMarca());
        bicicletaEntity.setEstado(bicicleta.getEstado());
        bicicletaEntity.setUsuarioId(bicicleta.getUsuarioId());
        bicicletaEntity.setValorPorHora(new BigDecimal(bicicleta.getValorPorHora()));

        return bicicletaEntity;
    }

    public static Bicicleta createBicicletaFrom(BicicletaEntity bicicletaEntity) {

        return Bicicleta
                .newBuilder()
                .setId(bicicletaEntity.getId())
                .setCodigo(bicicletaEntity.getCodigo())
                .setMarca(bicicletaEntity.getMarca())
                .setEstado(bicicletaEntity.getEstado())
                .setUsuarioId(bicicletaEntity.getUsuarioId())
                .setValorPorHora(String.valueOf(bicicletaEntity.getValorPorHora()))
                .build();
    }


    public static BicicletaEntity createBicicletaEntityFromAluguel(Aluguel aluguel) {

        BicicletaEntity bicicleta = new BicicletaEntity();
        bicicleta.setId(aluguel.getBicicleta().getId());
        return bicicleta;
    }

    public static Bicicleta createBicicletaFromAluguelEntity(AluguelEntity aluguel) {
        return Bicicleta
                .newBuilder()
                .setId(aluguel.getBicicleta().getId())
                .build();
    }
}
