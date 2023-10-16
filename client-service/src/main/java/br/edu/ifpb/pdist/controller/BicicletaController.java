package br.edu.ifpb.pdist.controller;

import br.com.paraibike.protofiles.Bicicleta;
import br.edu.ifpb.pdist.service.BicicletaService;
import com.google.protobuf.Descriptors;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@AllArgsConstructor
@RequestMapping(consumes = "application/json;charset=UTF-8", produces = MediaType.APPLICATION_JSON_VALUE)
public class BicicletaController {

    private BicicletaService bicicletaService;

    @GetMapping("/bicicletas/{bicicletaId}")
    public ResponseEntity<Map<Descriptors.FieldDescriptor, Object>> findById(@PathVariable int bicicletaId) {
        return ResponseEntity.ok(bicicletaService.findById(bicicletaId));
    }

    @GetMapping("/bicicletas")
    public ResponseEntity<List<Map<Descriptors.FieldDescriptor, Object>>> list() {
        return ResponseEntity.ok(bicicletaService.list());
    }

    @PostMapping("/bicicletas")
    public ResponseEntity<Map<Descriptors.FieldDescriptor, Object>> create(@RequestBody Map<String, String> map) {
        final var bicicleta = Bicicleta.newBuilder()
                .setCodigo(map.get("codigo"))
                .setMarca(map.get("marca"))
                .setEstado(map.get("estado"))
                .build();
        return ResponseEntity.ok(bicicletaService.create(bicicleta));
    }

    @PutMapping("/bicicletas/{bicicletaId}")
    public ResponseEntity<Map<Descriptors.FieldDescriptor, Object>> update(@PathVariable int bicicletaId, @RequestBody Map<String, String> map) {
        final var bicicleta = Bicicleta.newBuilder()
                .setId(bicicletaId)
                .setCodigo(map.get("codigo"))
                .setMarca(map.get("marca"))
                .setEstado(map.get("estado"))
                .build();
        return ResponseEntity.ok(bicicletaService.update(bicicleta));
    }

    @DeleteMapping("/bicicletas/{bicicletaId}")
    public ResponseEntity<Map<Descriptors.FieldDescriptor, Object>> delete(@PathVariable int bicicletaId) {
        return ResponseEntity.ok(bicicletaService.delete(bicicletaId));
    }
}
