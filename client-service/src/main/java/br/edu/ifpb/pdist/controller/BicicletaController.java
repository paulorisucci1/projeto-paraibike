package br.edu.ifpb.pdist.controller;

import br.com.paraibike.protofiles.Bicicleta;
import br.edu.ifpb.pdist.model.BicicletaDTO;
import br.edu.ifpb.pdist.service.BicicletaService;
import lombok.AllArgsConstructor;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;


@RestController
@AllArgsConstructor
@RequestMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.ALL_VALUE}, produces = MediaType.APPLICATION_JSON_VALUE)
public class BicicletaController {

    private BicicletaService bicicletaService;

    private CacheManager cacheManager;

    @GetMapping("/bicicletas/{bicicletaId}")
    @Cacheable(value = "bicicletas", key = "#bicicletaId")
    public BicicletaDTO findById(@PathVariable int bicicletaId) {
        return bicicletaService.findById(bicicletaId);
    }

    @GetMapping("/bicicletas")
    @Cacheable(value = "bicicletas")
    public List<BicicletaDTO> list() {
        return bicicletaService.list();
    }

    @GetMapping("/bicicletasByLocador/{idLocador}")
    @Cacheable(value = "bicicletas")
    public List<BicicletaDTO> listByLocador(@PathVariable Integer idLocador) {
        return bicicletaService.listByLocador(idLocador);
    }

    @PostMapping("/bicicletas")
    @CacheEvict(value = "bicicletas", allEntries = true)
    public BicicletaDTO create(@RequestBody BicicletaDTO bicicletaDTO) {

        final var bicicleta = Bicicleta.newBuilder()
                .setCodigo(bicicletaDTO.getCodigo())
                .setMarca(bicicletaDTO.getMarca())
                .setEstado(bicicletaDTO.getEstado())
                .setUsuarioId(1)
                .build();
        return bicicletaService.create(bicicleta);
    }

    @PutMapping("/bicicletas/{bicicletaId}")
    @CacheEvict(value = "bicicletas", allEntries = true)
    public BicicletaDTO update(@PathVariable int bicicletaId, @RequestBody BicicletaDTO bicicletaDTO) {
        final var bicicleta = Bicicleta.newBuilder()
                .setId(bicicletaId)
                .setCodigo(bicicletaDTO.getCodigo())
                .setMarca(bicicletaDTO.getMarca())
                .setEstado(bicicletaDTO.getEstado())
                .build();
        return bicicletaService.update(bicicleta);
    }

    @DeleteMapping("/bicicletas/{bicicletaId}")

    @CacheEvict(value = "bicicletas", key="#bicicletaId", allEntries = true)
    public ResponseEntity<Void> delete(@PathVariable int bicicletaId) {
        bicicletaService.delete(bicicletaId);
        return ResponseEntity.noContent().build();
    }
}
