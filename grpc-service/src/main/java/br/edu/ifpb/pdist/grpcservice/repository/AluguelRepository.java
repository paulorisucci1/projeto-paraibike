package br.edu.ifpb.pdist.grpcservice.repository;

import br.edu.ifpb.pdist.grpcservice.model.AluguelEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AluguelRepository extends JpaRepository<AluguelEntity, Integer> {
}
