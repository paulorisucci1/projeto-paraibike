package br.edu.ifpb.pdist.grpcservice.service;

import br.com.paraibike.protofiles.*;
import br.edu.ifpb.pdist.grpcservice.mapper.AluguelMapper;
import br.edu.ifpb.pdist.grpcservice.model.AluguelEntity;
import br.edu.ifpb.pdist.grpcservice.model.StatusAluguel;
import br.edu.ifpb.pdist.grpcservice.repository.AluguelRepository;
import io.grpc.stub.StreamObserver;
import lombok.AllArgsConstructor;
import net.devh.boot.grpc.server.service.GrpcService;

@GrpcService
@AllArgsConstructor
public class AluguelService extends AluguelServiceGrpc.AluguelServiceImplBase {

    private AluguelRepository aluguelRepository;

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
    public void createAluguel(Aluguel request, StreamObserver<Aluguel> responseObserver) {
        final var newEntity = AluguelMapper.createAluguelEntityFrom(request);
        final var createdEntity = aluguelRepository.save(newEntity);
        final var response = AluguelMapper.createAluguelFrom(createdEntity);

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void updateAluguel(Aluguel request, StreamObserver<Aluguel> responseObserver) {
        final var updateRequest = AluguelMapper.createAluguelEntityFrom(request);
        final var updatedAluguel = findAluguelEntityIfExist(updateRequest.getId());
        updatedAluguel.updateFrom(updateRequest);
        final var response = AluguelMapper.createAluguelFrom(aluguelRepository.save(updatedAluguel));
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
            throw new RuntimeException("Deu merda");
        }
        return aluguel.get();
    }
}
