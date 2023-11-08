package br.edu.ifpb.pdist.service;

import br.com.paraibike.protofiles.Aluguel;
import br.com.paraibike.protofiles.AluguelServiceGrpc.AluguelServiceStub;
import br.com.paraibike.protofiles.AluguelServiceGrpc.AluguelServiceBlockingStub;
import br.com.paraibike.protofiles.NoContent;
import br.edu.ifpb.pdist.mapper.AluguelMapper;
import br.edu.ifpb.pdist.model.AluguelDTO;
import net.devh.boot.grpc.client.inject.GrpcClient;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AluguelService {

    @GrpcClient("grpc-service")
    private AluguelServiceBlockingStub synchronousClient;

    @GrpcClient("grpc-service")
    private AluguelServiceStub asynchronousClient;

    public AluguelDTO findById(int aluguelId) {
        Aluguel aluguel = Aluguel
                .newBuilder()
                .setId(aluguelId)
                .build();
        return AluguelMapper.createAluguelDTOrom(synchronousClient.findAluguel(aluguel));
    }

    public List<AluguelDTO> list() {
        return synchronousClient
                .listAlugueis(NoContent.newBuilder().build())
                .getAluguelList()
                .stream()
                .map(AluguelMapper::createAluguelDTOrom)
                .collect(Collectors.toList());
    }

    public AluguelDTO create(Aluguel aluguel) {
        return AluguelMapper.createAluguelDTOrom(synchronousClient.createAluguel(aluguel));
    }

    public AluguelDTO update(Aluguel aluguel) {
        return AluguelMapper.createAluguelDTOrom(synchronousClient.updateAluguel(aluguel));
    }

    public void delete(int aluguelId) {
        Aluguel aluguel = Aluguel
                .newBuilder()
                .setId(aluguelId)
                .build();
        synchronousClient.deleteAluguel(aluguel);
    }
}
