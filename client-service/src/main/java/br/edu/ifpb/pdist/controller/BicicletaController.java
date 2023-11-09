package br.edu.ifpb.pdist.controller;

import br.com.paraibike.protofiles.Bicicleta;
import br.edu.ifpb.pdist.model.BicicletaDTO;
import br.edu.ifpb.pdist.service.BicicletaService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@AllArgsConstructor
@RequestMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.ALL_VALUE}, produces = MediaType.APPLICATION_JSON_VALUE)
public class BicicletaController {

    private BicicletaService bicicletaService;

    @GetMapping("/bicicletas/{bicicletaId}")
    public ResponseEntity<BicicletaDTO> findById(@PathVariable int bicicletaId) {
        return ResponseEntity.ok(bicicletaService.findById(bicicletaId));
    }

    @GetMapping("/bicicletas")
    public ResponseEntity<List<BicicletaDTO>> list() {
        return ResponseEntity.ok(bicicletaService.list());
    }

    @GetMapping("/bicicletasByLocador/{idLocador}")
    public ResponseEntity<List<BicicletaDTO>> listByLocador(@PathVariable Integer idLocador) {
        return ResponseEntity.ok(bicicletaService.listByLocador(idLocador));
    }

    @PostMapping("/bicicletas")
    public ResponseEntity<BicicletaDTO> create(@RequestBody BicicletaDTO bicicletaDTO) {
        final var bicicleta = Bicicleta.newBuilder()
                .setCodigo(bicicletaDTO.getCodigo())
                .setMarca(bicicletaDTO.getMarca())
                .setEstado(bicicletaDTO.getEstado())
                .setUsuarioId(bicicletaDTO.getUsuarioId())
                .build();
        return ResponseEntity.ok(bicicletaService.create(bicicleta));
    }

    @PutMapping("/bicicletas/{bicicletaId}")
    public ResponseEntity<BicicletaDTO> update(@PathVariable int bicicletaId, @RequestBody BicicletaDTO bicicletaDTO) {
        final var bicicleta = Bicicleta.newBuilder()
                .setId(bicicletaId)
                .setCodigo(bicicletaDTO.getCodigo())
                .setMarca(bicicletaDTO.getMarca())
                .setEstado(bicicletaDTO.getEstado())
                .build();
        return ResponseEntity.ok(bicicletaService.update(bicicleta));
    }

    @DeleteMapping("/bicicletas/{bicicletaId}")
    public ResponseEntity<Void> delete(@PathVariable int bicicletaId) {
        bicicletaService.delete(bicicletaId);
        return ResponseEntity.noContent().build();
    }
}
