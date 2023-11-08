package br.edu.ifpb.pdist.grpcservice.repository;

import br.edu.ifpb.pdist.grpcservice.model.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Integer> {
}
