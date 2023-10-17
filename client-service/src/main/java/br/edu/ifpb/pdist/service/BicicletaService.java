package br.edu.ifpb.pdist.service;

import br.com.paraibike.protofiles.Bicicleta;
import br.com.paraibike.protofiles.BicicletaServiceGrpc;
import br.com.paraibike.protofiles.NoContent;
import br.edu.ifpb.pdist.mapper.BicicletaMapper;
import br.edu.ifpb.pdist.model.BicicletaDTO;
import net.devh.boot.grpc.client.inject.GrpcClient;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BicicletaService {

    @GrpcClient("grpc-service")
    BicicletaServiceGrpc.BicicletaServiceBlockingStub synchronousClient;

    @GrpcClient("grpc-service")
    BicicletaServiceGrpc.BicicletaServiceStub asynchronousClient;

    public BicicletaDTO findById(int bicicletaId) {
        Bicicleta bicicleta = Bicicleta
                .newBuilder()
                .setId(bicicletaId)
                .build();
        return BicicletaMapper.createBicicletaDTOFrom(synchronousClient.findBicicleta(bicicleta));
    }

    public List<BicicletaDTO> list() {
        return synchronousClient
                .listBicicletas(NoContent.newBuilder().build())
                .getBicicletasList()
                .stream()
                .map(BicicletaMapper::createBicicletaDTOFrom)
                .collect(Collectors.toList());
    }

    public BicicletaDTO create(Bicicleta bicicleta) {
        return BicicletaMapper.createBicicletaDTOFrom(synchronousClient.createBicicleta(bicicleta));
    }

    public BicicletaDTO update(Bicicleta bicicleta) {
        return BicicletaMapper.createBicicletaDTOFrom(synchronousClient.updateBicicleta(bicicleta));
    }

    public void delete(int bicicletaId) {
        Bicicleta bicicleta = Bicicleta
                .newBuilder()
                .setId(bicicletaId)
                .build();
        synchronousClient.deleteBicicleta(bicicleta);
    }
}
