package com.pfe.backend_pfe.Metier.MedecinService;

import com.pfe.backend_pfe.DTO.MedecinDto;
import com.pfe.backend_pfe.DTO.PageMedcinDto;
import com.pfe.backend_pfe.Entities.Medecin;
import com.pfe.backend_pfe.Entities.Specialite;
import com.pfe.backend_pfe.Mappers.MedecinMapper;
import com.pfe.backend_pfe.reposetory.MedcineRepo;
import com.pfe.backend_pfe.reposetory.SpecRepo;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class MedecinImpl implements MedecinMetier{

    private final MedcineRepo medcineRepo;
    private final MedecinMapper medecinMapper;
private final SpecRepo specRepo;

//    @Override
//    public List<MedecinDto> getAllMedecins() {
//        List<MedecinDto> m= medcineRepo.findAllBySpecialite()
//                .stream()
//                .map(medecinMapper::mapToDto)
//                .toList();
//        for(MedecinDto medcins: m){
//            medcins.setNomspec(medcineRepo.findSpecialiteByMedcinId(medcins.getId()));
//        }
//        return m;
//    }

    @Override
    public PageMedcinDto getAllMedecins(int page, int size) {
            Page<Medecin> pMed = medcineRepo.findAll(PageRequest.of(page, size));

        List<MedecinDto> m= pMed.getContent()
                .stream()
                .map(medecinMapper::mapToDto)
                .toList();
        for(MedecinDto medcins: m){
            medcins.setNomspec(medcineRepo.findSpecialiteByMedcinId(medcins.getId()));
        }
        PageMedcinDto pDto = new PageMedcinDto();
        pDto.setMeds(m);
        pDto.setCurrentPage(page);
        pDto.setPageSize(size);
        pDto.setTotalPages(pMed.getTotalPages());
        return pDto;
    }

    // method bach nfiltriw par specialite
//    @Override
//    public List<MedecinDto> getMedcinBySpec(String spec) {
//
// Specialite spc=specRepo.findSpecialiteByNomspec(spec);
//        return medcineRepo.findBySpecialite(spc)
//                .stream()
//                .map(medecinMapper::mapToDto)
//                .collect(Collectors.toList());
//    }

        @Override
    public PageMedcinDto getMedcinBySpec(String spec, int page, int size) {
// Specialite spc=specRepo.findSpecialiteByNomspec(spec);
 Page<Medecin> med = medcineRepo.findBySpecialiteMed(spec, PageRequest.of(page,size));
            List<MedecinDto> list = med.getContent()
                    .stream()
                    .map(medecinMapper::mapToDto)
                    .toList();
            for (MedecinDto m : list) {
                m.setNomspec(medcineRepo.findSpecialiteByMedcinId(m.getId()));
            }
            PageMedcinDto dto = new PageMedcinDto();
            dto.setMeds(list);
            dto.setCurrentPage(page);
            dto.setPageSize(size);
            dto.setTotalPages(med.getTotalPages());
            return dto;
        }

    @Override
    public MedecinDto getMedecinById(Long id) {
        Medecin m = medcineRepo.findById(id).orElseThrow(()-> new RuntimeException("medecin not found!!"));
        MedecinDto dto = medecinMapper.mapToDto(m);
        dto.setNomspec(m.getSpecialite().getNomspec());
        dto.setEmail(m.getEmail());
        dto.setTelephone(m.getTelephone());
        //dto.setDescription(m.getDescription());
        dto.setDescription("description!!");
        dto.setAge(m.getAge());
        if(m.getHopital()!=null){
            dto.setNomHospital(m.getHopital().getNom_hopital());
        }else {
            dto.setNomHospital("aucun hopital!!");
        }
        return dto;
    }
}
