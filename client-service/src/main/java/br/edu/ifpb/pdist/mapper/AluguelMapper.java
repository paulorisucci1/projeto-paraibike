package br.edu.ifpb.pdist.mapper;

import br.com.paraibike.protofiles.Aluguel;
import br.com.paraibike.protofiles.Usuario;
import br.edu.ifpb.pdist.model.AluguelDTO;
import br.edu.ifpb.pdist.model.UsuarioDTO;

import java.util.Objects;

public class AluguelMapper {

    public static AluguelDTO createAluguelDTOrom(Aluguel aluguel) {
        AluguelDTO aluguelEntity = new AluguelDTO();

        aluguelEntity.setId(aluguel.getId());
        aluguelEntity.setUsuarioDTO(createUsuarioDTOFrom(aluguel.getUsuario()));
        aluguelEntity.setBicicletaDTO(BicicletaMapper.createBicicletaDTOFrom(aluguel.getBicicleta()));
        aluguelEntity.setData(aluguel.getData());
        aluguelEntity.setValor(aluguel.getValor());
        aluguelEntity.setStatus(aluguel.getStatus());

        return aluguelEntity;
    }

    public static Aluguel createAluguelFrom(AluguelDTO aluguelDTO) {
        return Aluguel.newBuilder()
                .setId(aluguelDTO.getId())
                .setUsuario(createUsuarioFrom(aluguelDTO.getUsuarioDTO()))
                .setBicicleta(BicicletaMapper.createBicicletaFrom(aluguelDTO.getBicicletaDTO()))
                .setData(String.valueOf(aluguelDTO.getData()))
                .setValor(String.valueOf(aluguelDTO.getValor()))
                .setStatus(aluguelDTO.getStatus())
                .build();
    }

    private static UsuarioDTO createUsuarioDTOFrom(Usuario usuario) {
        final var usuarioDTO = new UsuarioDTO();

        usuarioDTO.setId(usuario.getId());
        usuarioDTO.setCpf(usuario.getCpf());
        usuarioDTO.setNome(usuario.getNome());
        usuarioDTO.setEmail(usuario.getEmail());
        usuarioDTO.setSenha(usuario.getSenha());
        usuarioDTO.setEndereco(usuario.getEndereco());
        usuarioDTO.setTelefone(usuario.getTelefone());

        return usuarioDTO;
    }

    private static Usuario createUsuarioFrom(UsuarioDTO usuarioDTO) {
        return Usuario
                .newBuilder()
                .setId(usuarioDTO.getId())
                .setCpf(usuarioDTO.getCpf())
                .setNome(usuarioDTO.getNome())
                .setEmail(usuarioDTO.getEmail())
                .setSenha(usuarioDTO.getSenha())
                .setEndereco(usuarioDTO.getEndereco())
                .setTelefone(usuarioDTO.getTelefone())
                .build();
    }
}
