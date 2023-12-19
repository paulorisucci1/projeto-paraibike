package br.edu.ifpb.pdist.grpcservice.repository;

import br.edu.ifpb.pdist.grpcservice.model.AluguelEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AluguelRepository extends JpaRepository<AluguelEntity, Integer> {

    List<AluguelEntity> findByUsuarioId(Integer usuarioId);
}
