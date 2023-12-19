package br.edu.ifpb.pdist.grpcservice.service;

import br.com.paraibike.protofiles.*;
import br.edu.ifpb.pdist.grpcservice.mapper.AluguelMapper;
import br.edu.ifpb.pdist.grpcservice.model.AluguelEntity;
import br.edu.ifpb.pdist.grpcservice.model.BicicletaEntity;
import br.edu.ifpb.pdist.grpcservice.model.StatusAluguel;
import br.edu.ifpb.pdist.grpcservice.repository.AluguelRepository;
import br.edu.ifpb.pdist.grpcservice.repository.BicicletaRepository;
import io.grpc.stub.StreamObserver;
import lombok.AllArgsConstructor;
import net.devh.boot.grpc.server.service.GrpcService;

import java.time.LocalDateTime;

@GrpcService
@AllArgsConstructor
public class AluguelService extends AluguelServiceGrpc.AluguelServiceImplBase {

    private AluguelRepository aluguelRepository;

    private BicicletaRepository bicicletaRepository;

    @Override
    public void findAluguel(Aluguel request, StreamObserver<Aluguel> responseObserver) {
        final var entity = aluguelRepository.findById(request.getId());

        if(entity.isPresent()) {
            final var response = AluguelMapper.createAluguelFrom(entity.get());
            responseObserver.onNext(response);
        }

        responseObserver.onCompleted();
    }

    @Override
    public void listAlugueis(NoContent request, StreamObserver<Alugueis> responseObserver) {


        final var entities = aluguelRepository.findAll();
        final var responses = Alugueis.newBuilder();

        if(!entities.isEmpty()) {
            entities.forEach(
                    aluguelEntity -> responses.addAluguel(AluguelMapper.createAluguelFrom(aluguelEntity))
            );
        }

        responseObserver.onNext(responses.build());
        responseObserver.onCompleted();
    }

    @Override
    public void listAlugueisForUser(Usuario request, StreamObserver<Alugueis> responseObserver) {


        final var entities = aluguelRepository.findByUsuarioId(request.getId());
        final var responses = Alugueis.newBuilder();

        if(!entities.isEmpty()) {
            entities.forEach(
                    aluguelEntity -> responses.addAluguel(AluguelMapper.createAluguelFrom(aluguelEntity))
            );
        }

        responseObserver.onNext(responses.build());
        responseObserver.onCompleted();
    }

    @Override
    public void createAluguel(Aluguel aluguelRequest, StreamObserver<Aluguel> responseObserver) {
        final var newAluguel = AluguelMapper.createAluguelEntityFrom(aluguelRequest);
        newAluguel.setBicicleta(findBicicletaForAluguel(aluguelRequest));
        newAluguel.addValor();
        final var createdEntity = aluguelRepository.save(newAluguel);
        final var response = AluguelMapper.createAluguelFrom(createdEntity);

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void updateAluguel(Aluguel request, StreamObserver<Aluguel> responseObserver) {
        final var updateRequest = AluguelMapper.createAluguelEntityFrom(request);
        final var aluguelBD = findAluguelEntityIfExist(updateRequest.getId());
        aluguelBD.updateFrom(updateRequest);
        aluguelBD.addValor();
        final var response = AluguelMapper.createAluguelFrom(aluguelRepository.save(aluguelBD));
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void cancelAluguel(Aluguel request, StreamObserver<Feedback> responseObserver) {
        final var cancelledAluguel = aluguelRepository
                .findById(request.getId())
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Fodeu"));
        cancelledAluguel.setStatus(StatusAluguel.CANCELADO);
        aluguelRepository.save(cancelledAluguel);
        responseObserver.onNext(
                Feedback.newBuilder()
                        .setMessage("OK")
                        .build());
        responseObserver.onCompleted();
    }

    private AluguelEntity findAluguelEntityIfExist(Integer aluguelId) {
        final var aluguel = aluguelRepository.findById(aluguelId);
        if(aluguel.isEmpty()) {
            throw new RuntimeException("Deu merda: Aluguel não encontrado para o id");
        }
        return aluguel.get();
    }

    private BicicletaEntity findBicicletaForAluguel(Aluguel aluguel) {

        final var bicicleta = bicicletaRepository.findById(aluguel.getBicicleta().getId());

        if(bicicleta.isEmpty()) {
            throw new RuntimeException("Fodeu: bicicleta não encontrada para o aluguel");
        }

        return bicicleta.get();
    }
}
