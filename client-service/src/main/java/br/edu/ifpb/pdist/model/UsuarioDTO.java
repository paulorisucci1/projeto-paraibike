package br.edu.ifpb.pdist.model;

import lombok.Data;

@Data
public class UsuarioDTO {

    private Integer id;

    private String nome;

    private String cpf;

    private String email;

    private String senha;

    private String endereco;

    private String telefone;
}
