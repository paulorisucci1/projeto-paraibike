package br.edu.ifpb.pdist.grpcservice.model;


import br.edu.ifpb.pdist.grpcservice.exceptions.EntityNotFoundException;
import br.edu.ifpb.pdist.grpcservice.exceptions.StatusNotFoundException;
import lombok.Getter;

import java.util.Arrays;

@Getter
public enum StatusAluguel {

    APROVADO(1, "Aprovado"),

    REPROVADO(2, "Reprovado"),

    CANCELADO(3, "Cancelado");

    private Integer id;

    private String descricao;

    StatusAluguel(Integer id, String descricao) {
        this.id = id;
        this.descricao = descricao;
    }

    public static StatusAluguel getStatusFromDescricao(String descricao) {
        return Arrays.stream(values())
                .filter(status -> status.descricao.equals(descricao))
                .findFirst()
                .orElseThrow(() -> new StatusNotFoundException("Nenhum status encontrado com a descrição: "+descricao));
    }
}
