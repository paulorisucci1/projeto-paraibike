package br.edu.ifpb.pdist.grpcservice.mapper;

import br.com.paraibike.protofiles.Aluguel;
import br.com.paraibike.protofiles.Usuario;
import br.edu.ifpb.pdist.grpcservice.model.AluguelEntity;
import br.edu.ifpb.pdist.grpcservice.model.StatusAluguel;
import br.edu.ifpb.pdist.grpcservice.model.UsuarioEntity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class AluguelMapper {

    public static AluguelEntity createAluguelEntityFrom(Aluguel aluguel) {
        AluguelEntity aluguelEntity = new AluguelEntity();

        aluguelEntity.setId(aluguel.getId());
        aluguelEntity.setUsuario(createUsuarioEntityFrom(aluguel.getUsuario()));
        aluguelEntity.setBicicleta(BicicletaMapper.createBicicletaEntityFrom(aluguel.getBicicleta()));
        aluguelEntity.setData(LocalDateTime.parse(aluguel.getData(), DateTimeFormatter.ISO_DATE_TIME));
        aluguelEntity.setValor(new BigDecimal(aluguel.getValor()));
        aluguelEntity.setStatus(StatusAluguel.getStatusFromDescricao(aluguel.getStatus()));

        return aluguelEntity;
    }

    public static Aluguel createAluguelFrom(AluguelEntity aluguelEntity) {
        return Aluguel.newBuilder()
                .setId(aluguelEntity.getId())
                .setUsuario(createUsuarioFrom(aluguelEntity.getUsuario()))
                .setBicicleta(BicicletaMapper.createBicicletaFrom(aluguelEntity.getBicicleta()))
                .setData(String.valueOf(aluguelEntity.getData()))
                .setValor(String.valueOf(aluguelEntity.getValor()))
                .setStatus(aluguelEntity.getStatus().getDescricao())
                .build();
    }

    private static UsuarioEntity createUsuarioEntityFrom(Usuario usuario) {
        final var usuarioEntity = new UsuarioEntity();

        usuarioEntity.setId(usuario.getId());
        usuarioEntity.setCpf(usuario.getCpf());
        usuarioEntity.setNome(usuario.getNome());
        usuarioEntity.setEmail(usuario.getEmail());
        usuarioEntity.setSenha(usuario.getSenha());
        usuarioEntity.setEndereco(usuario.getEndereco());
        usuarioEntity.setTelefone(usuario.getTelefone());

        return usuarioEntity;
    }

    private static Usuario createUsuarioFrom(UsuarioEntity usuarioEntity) {
        return Usuario
                .newBuilder()
                .setId(usuarioEntity.getId())
                .setCpf(usuarioEntity.getCpf())
                .setNome(usuarioEntity.getNome())
                .setEmail(usuarioEntity.getEmail())
                .setSenha(usuarioEntity.getSenha())
                .setEndereco(usuarioEntity.getEndereco())
                .setTelefone(usuarioEntity.getTelefone())
                .build();

    }
}
