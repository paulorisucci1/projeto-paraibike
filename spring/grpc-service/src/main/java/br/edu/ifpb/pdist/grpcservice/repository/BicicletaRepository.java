package br.edu.ifpb.pdist.grpcservice.repository;


import br.edu.ifpb.pdist.grpcservice.model.BicicletaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BicicletaRepository extends JpaRepository<BicicletaEntity, Integer> {
}
