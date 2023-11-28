package br.edu.ifpb.pdist.grpcservice.service;

import br.com.paraibike.protofiles.*;
import br.edu.ifpb.pdist.grpcservice.exceptions.EntityNotFoundException;
import br.edu.ifpb.pdist.grpcservice.mapper.BicicletaMapper;
import br.edu.ifpb.pdist.grpcservice.repository.BicicletaRepository;
import io.grpc.stub.StreamObserver;
import lombok.AllArgsConstructor;
import net.devh.boot.grpc.server.service.GrpcService;

@GrpcService
@AllArgsConstructor
public class BicicletaService extends BicicletaServiceGrpc.BicicletaServiceImplBase {

    private BicicletaRepository bicicletaRepository;

    @Override
    public void findBicicleta(Bicicleta request, StreamObserver<Bicicleta> responseObserver) {
        final var entity = bicicletaRepository.findById(request.getId());

        try {
            Thread.sleep(2000);
        } catch (Exception e) {
            System.out.println("...");
        }

        if(entity.isPresent()) {
            final var response = BicicletaMapper.createBicicletaFrom(entity.get());
            responseObserver.onNext(response);
        }
        responseObserver.onCompleted();
    }

    @Override
    public void listBicicletas(NoContent request, StreamObserver<Bicicletas> responseObserver) {


        try {
            Thread.sleep(2000);
        } catch (Exception e) {
            System.out.println("...");
        }
        final var entities = bicicletaRepository.findAll();
        final var responses = Bicicletas.newBuilder();

        if(!entities.isEmpty()) {
            entities.forEach(
                    bicicleta -> responses.addBicicletas(BicicletaMapper.createBicicletaFrom(bicicleta))
                    );
        }

        responseObserver.onNext(responses.build());
        responseObserver.onCompleted();
    }

    @Override
    public void listBicicletasByLocador(Usuario usuario, StreamObserver<Bicicletas> responseObserver) {
        final var locadorId = usuario.getId();
        final var entities = bicicletaRepository.findByUsuarioId(locadorId);
        final var responses = Bicicletas.newBuilder();
        if(!entities.isEmpty()) {
            entities.forEach(
                    bicicleta -> responses.addBicicletas(BicicletaMapper.createBicicletaFrom(bicicleta))
            );
        }

        responseObserver.onNext(responses.build());
        responseObserver.onCompleted();
    }

    @Override
    public void createBicicleta(Bicicleta request, StreamObserver<Bicicleta> responseObserver) {
        final var newEntity = BicicletaMapper.createBicicletaEntityFrom(request);
        final var createdEntity = bicicletaRepository.save(newEntity);
        final var response = BicicletaMapper.createBicicletaFrom(createdEntity);

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void updateBicicleta(Bicicleta request, StreamObserver<Bicicleta> responseObserver) {
        final var updatedBicicleta = BicicletaMapper.createBicicletaEntityFrom(request);
        final var foundBicicletaOptional = bicicletaRepository.findById(request.getId());

        if(!foundBicicletaOptional.isPresent()) {
            throw new EntityNotFoundException("FODEU");
        }

        final var foundBicicleta = foundBicicletaOptional.get();
        foundBicicleta.update(updatedBicicleta);

        final var updatedEntity = bicicletaRepository.save(foundBicicleta);
        final var response = BicicletaMapper.createBicicletaFrom(updatedEntity);

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void deleteBicicleta(Bicicleta request, StreamObserver<Feedback> responseObserver) {
        bicicletaRepository.deleteById(request.getId());
        responseObserver.onNext(
                Feedback.newBuilder()
                        .setMessage("OK")
                        .build());
        responseObserver.onCompleted();
    }
}
