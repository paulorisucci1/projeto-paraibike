package br.edu.ifpb.pdist.service;

import br.com.paraibike.protofiles.Bicicleta;
import br.com.paraibike.protofiles.BicicletaServiceGrpc;
import br.com.paraibike.protofiles.NoContent;
import br.edu.ifpb.pdist.mapper.BicicletaMapper;
import br.edu.ifpb.pdist.model.BicicletaResponse;
import com.google.protobuf.Descriptors;
import com.google.protobuf.GeneratedMessageV3;
import net.devh.boot.grpc.client.inject.GrpcClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class BicicletaService {

    @GrpcClient("grpc-service")
    BicicletaServiceGrpc.BicicletaServiceBlockingStub synchronousClient;

    @GrpcClient("grpc-service")
    BicicletaServiceGrpc.BicicletaServiceStub asynchronousClient;

    public BicicletaResponse findById(int bicicletaId) {
        Bicicleta bicicleta = Bicicleta
                .newBuilder()
                .setId(bicicletaId)
                .build();
        return BicicletaMapper.createBicicletaResponseFrom(synchronousClient.findBicicleta(bicicleta));
    }

    public List<BicicletaResponse> list() {
        return synchronousClient
                .listBicicletas(NoContent.newBuilder().build())
                .getBicicletasList()
                .stream()
                .map(BicicletaMapper::createBicicletaResponseFrom)
                .collect(Collectors.toList());
    }

    public BicicletaResponse create(Bicicleta bicicleta) {
        return BicicletaMapper.createBicicletaResponseFrom(synchronousClient.createBicicleta(bicicleta));
    }

    public BicicletaResponse update(Bicicleta bicicleta) {
        return BicicletaMapper.createBicicletaResponseFrom(synchronousClient.updateBicicleta(bicicleta));
    }

    public void delete(int bicicletaId) {
        Bicicleta bicicleta = Bicicleta
                .newBuilder()
                .setId(bicicletaId)
                .build();
        synchronousClient.deleteBicicleta(bicicleta);
    }
}
