package br.edu.ifpb.pdist.grpcservice.exceptions;

public class StatusNotFoundException extends RuntimeException {

    public StatusNotFoundException() {
    }

    public StatusNotFoundException(String message) {
        super(message);
    }
}
