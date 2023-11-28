package br.edu.ifpb.pdist.controller;


import br.com.paraibike.protofiles.Aluguel;
import br.edu.ifpb.pdist.model.AluguelDTO;
import br.edu.ifpb.pdist.service.AluguelService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import static br.edu.ifpb.pdist.mapper.BicicletaMapper.*;


@RestController
@AllArgsConstructor
@RequestMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.ALL_VALUE}, produces = MediaType.APPLICATION_JSON_VALUE)
public class AluguelController {


    private AluguelService aluguelService;

    @GetMapping("/alugueis/{aluguelId}")
    public ResponseEntity<AluguelDTO> findById(@PathVariable int aluguelId) {
        return ResponseEntity.ok(aluguelService.findById(aluguelId));
    }

    @GetMapping("/alugueis")
    public ResponseEntity<List<AluguelDTO>> list() {
        return ResponseEntity.ok(aluguelService.list());
    }

    @PostMapping("/alugueis")
    public ResponseEntity<AluguelDTO> create(@RequestBody AluguelDTO aluguelDTO) {
        final var aluguel = Aluguel.newBuilder()
                .setUsuarioId(aluguelDTO.getUsuarioId())
                .setBicicleta(createBicicletaFrom(aluguelDTO.getBicicleta()))
                .setData(String.valueOf(aluguelDTO.getData()))
                .setQuantidadeHoras(aluguelDTO.getQuantidadeHoras())
                .setStatus("Aprovado")
                .build();
        return ResponseEntity.ok(aluguelService.create(aluguel));
    }

    @PutMapping("/alugueis/{aluguelId}")
    public ResponseEntity<AluguelDTO> update(@PathVariable int aluguelId, @RequestBody AluguelDTO aluguelDTO) {
        final var aluguel = Aluguel.newBuilder()
                .setId(aluguelId)
                .setData(String.valueOf(aluguelDTO.getData()))
                .setQuantidadeHoras(aluguelDTO.getQuantidadeHoras())
                .setStatus("Aprovado")
                .build();
        return ResponseEntity.ok(aluguelService.update(aluguel));
    }

    @DeleteMapping("/alugueis/{aluguelId}")
    public ResponseEntity<Void> delete(@PathVariable int aluguelId) {
        aluguelService.delete(aluguelId);
        return ResponseEntity.noContent().build();
    }

}
