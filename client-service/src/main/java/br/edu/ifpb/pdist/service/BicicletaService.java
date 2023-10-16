package br.edu.ifpb.pdist.service;

import br.com.paraibike.protofiles.Bicicleta;
import br.com.paraibike.protofiles.BicicletaServiceGrpc;
import br.com.paraibike.protofiles.NoContent;
import com.google.protobuf.Descriptors;
import com.google.protobuf.GeneratedMessageV3;
import net.devh.boot.grpc.client.inject.GrpcClient;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class BicicletaService {

    @GrpcClient("grpc-service")
    BicicletaServiceGrpc.BicicletaServiceBlockingStub synchronousClient;

    @GrpcClient("grpc-service")
    BicicletaServiceGrpc.BicicletaServiceStub asynchronousClient;


    public Map<Descriptors.FieldDescriptor, Object> findById(int bicicletaId) {
        Bicicleta bicicleta = Bicicleta
                .newBuilder()
                .setId(bicicletaId)
                .build();
        Bicicleta bicicletaResponse = synchronousClient.findBicicleta(bicicleta);
        return bicicletaResponse.getAllFields();
    }

    public List<Map<Descriptors.FieldDescriptor, Object>> list() {
        return synchronousClient
                .listBicicletas(NoContent.newBuilder().build())
                .getBicicletasList()
                .stream()
                .map(GeneratedMessageV3::getAllFields)
                .collect(Collectors.toList());
    }

    public Map<Descriptors.FieldDescriptor, Object> create(Bicicleta bicicleta) {
        Bicicleta bicicletaResponse = synchronousClient.createBicicleta(bicicleta);
        return bicicletaResponse.getAllFields();
    }

    public Map<Descriptors.FieldDescriptor, Object> update(Bicicleta bicicleta) {
        Bicicleta bicicletaResponse = synchronousClient.updateBicicleta(bicicleta);
        return bicicletaResponse.getAllFields();
    }

    public Map<Descriptors.FieldDescriptor, Object> delete(int bicicletaId) {
        Bicicleta bicicleta = Bicicleta
                .newBuilder()
                .setId(bicicletaId)
                .build();
        return synchronousClient.deleteBicicleta(bicicleta).getAllFields();
    }
}
