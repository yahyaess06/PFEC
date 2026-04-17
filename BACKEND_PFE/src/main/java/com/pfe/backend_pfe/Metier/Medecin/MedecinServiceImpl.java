package com.pfe.backend_pfe.Metier.Medecin;

import com.pfe.backend_pfe.DTO.*;
import com.pfe.backend_pfe.Entities.Medecin;
import com.pfe.backend_pfe.Exceptions.MedcinNotFoundException;
import com.pfe.backend_pfe.Entities.Personnel;
import com.pfe.backend_pfe.Exceptions.DateApresException;
import com.pfe.backend_pfe.Exceptions.MedcinNotFoundException;
import com.pfe.backend_pfe.Exceptions.PersonnelNotFOundException;
import com.pfe.backend_pfe.Mappers.MedecinMapper;
import com.pfe.backend_pfe.reposetory.MedcineRepo;
import com.pfe.backend_pfe.reposetory.PersonnelRepo;
import com.pfe.backend_pfe.reposetory.SpecialiteRepo;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
@Transactional
@AllArgsConstructor
public class MedecinServiceImpl implements MedecinService{

    private final MedecinMapper mM;
    private final MedcineRepo mR;
    private final PasswordEncoder pE;
    private final PersonnelRepo pR;
    private final SpecialiteRepo sp;

    @Override
    public MedecinProfileDto voireMedecin(Long medId) throws MedcinNotFoundException {
        Medecin m = mR.findById(medId).orElseThrow(()->new MedcinNotFoundException("Medecin not found"));
        return new MedecinProfileDto(
                m.getCin(),
                m.getNom(),
                m.getPrenom(),
                m.getSpecialite().getNomspec(),
                m.getAge(),
                m.getEmail(),
                m.getTelephone()
        );
    }

    @Override
    public CountDocDto voireNombreDocs(Long id) throws PersonnelNotFOundException {
        Personnel p=pR.findById(id).orElseThrow(()->new PersonnelNotFOundException("Personnel not found"));
        CountDocDto countDocDto = new CountDocDto();
        countDocDto.setCountDocs(mR.FindCountMedecin(p.getHopital().getId_hopital()));
        return countDocDto;
    }

    @Override
    public PageMedcinDto voireMedcines(Long id, String nom,String cin, String spec, int page, int size) throws PersonnelNotFOundException, MedcinNotFoundException {
        Personnel p=pR.findById(id).orElseThrow(()->new PersonnelNotFOundException("Personnel not found"));
//        String nomSpec = (spec != null) ? spec.getNomspec() : null;
        Page<MedecinsDto> m=mR.findAllBySpecialiteOrNom(p.getHopital().getId_hopital(),nom,spec,cin, PageRequest.of(page, size));
        if(m==null){
            throw new MedcinNotFoundException("ya pas de medecin dans cet hopital");
        }
        PageMedcinDto dto=new PageMedcinDto();
        dto.setMs(m.getContent());
        dto.setPageSize(size);
        dto.setCurrentPage(page);
        dto.setTotalPages(m.getTotalPages());
        return dto;
    }

@Override
public void creerOuModifierMed(CreationDocDto c, Long idPersonnel) throws PersonnelNotFOundException, DateApresException {

    Personnel p = pR.findById(idPersonnel)
            .orElseThrow(() -> new PersonnelNotFOundException("Personnel not found"));
    Medecin m;
    if (c.getId() != null) {
        m = mR.findById(c.getId())
                .orElseThrow(() -> new PersonnelNotFOundException("Medecin not found"));
    } else {
        m = new Medecin();
        m.setHopital(p.getHopital());
    }

    m.setCin(c.getCin());
    m.setNom(c.getNom());
    m.setPrenom(c.getPrenom());
    m.setEmail(c.getEmail());
    m.setTelephone(c.getTelephone());
    m.setAge(c.getAge());
    m.setDescription(c.getDescription());
    m.setSpecialite(sp.findByNomspec(c.getSpecialite()));
    if(c.getDate_arrivee().before(new Date())) {
        m.setDate_sortie(c.getDate_arrivee());
    }
    else{
        throw new DateApresException("date est apres la date de aujourdui");
    }

    if (c.getPassword() != null && !c.getPassword().trim().isEmpty()) {
        m.setPassword(pE.encode(c.getPassword()));
    } else if (c.getId() == null) {
        throw new IllegalArgumentException("Password obligatoire en création");
    }

    mR.save(m);
}


    @Override
    public CreationDocDto voireMed(Long id) throws MedcinNotFoundException {
        Medecin m=mR.findById(id).orElseThrow(()->new MedcinNotFoundException("med not found"));
        CreationDocDto c=new CreationDocDto();
        c.setId(m.getId());
        c.setCin(m.getCin());
        c.setNom(m.getNom());
        c.setPrenom(m.getPrenom());
        c.setEmail(m.getEmail());
        c.setTelephone(m.getTelephone());
        c.setAge(m.getAge());
        c.setDescription(m.getDescription());
        c.setSpecialite(m.getSpecialite().getNomspec());
        c.setDate_arrivee(m.getDate_arrivee());
        //c.setPassword(m.getPassword());
        return c;
    }

    @Override
    public void supprimerDepuisHopital(Long id) throws MedcinNotFoundException{

        Medecin m=mR.findById(id).orElseThrow(()->
             new MedcinNotFoundException("Medecin not found"));
        m.setHopital(null);
mR.save(m);
    }

}
