package br.edu.ifpb.pdist.grpcservice.repository;


import br.edu.ifpb.pdist.grpcservice.model.BicicletaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BicicletaRepository extends JpaRepository<BicicletaEntity, Integer> {

    List<BicicletaEntity> findByUsuarioId(Integer usuarioId);
}
