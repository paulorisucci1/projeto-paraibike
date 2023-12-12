package br.edu.ifpb.pdist.grpcservice.model;

import lombok.Getter;

import java.util.Arrays;

@Getter
public enum EstadoBicicleta {

    NOVA("Nova"),

    BOM_ESTADO("Bom estado de conservação"),

    INATIVA("Inativa");

    private String descricao;

    EstadoBicicleta(String descricao) {
        this.descricao = descricao;
    }

    public static EstadoBicicleta getEstadoBicicletaFromName(String name) {
        return Arrays.stream(values())
                .filter(estado -> estado.name().equalsIgnoreCase(name))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Estado invalido"));
    }

    public static EstadoBicicleta getEstadoBicicletaFromDescricao(String descricao) {
        return Arrays.stream(values())
                .filter(estado -> estado.getDescricao().equalsIgnoreCase(descricao))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Estado invalido"));
    }
}
