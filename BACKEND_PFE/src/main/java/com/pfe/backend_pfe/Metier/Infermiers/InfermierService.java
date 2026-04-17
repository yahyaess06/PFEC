package com.pfe.backend_pfe.Metier.Infermiers;

import com.pfe.backend_pfe.DTO.*;
import com.pfe.backend_pfe.Entities.Infermier;
import com.pfe.backend_pfe.Entities.Personnel;
import com.pfe.backend_pfe.Exceptions.DateApresException;
import com.pfe.backend_pfe.Exceptions.InfermierNotFoundException;
import com.pfe.backend_pfe.Exceptions.PersonnelNotFOundException;
import com.pfe.backend_pfe.reposetory.InfermierRepo;
import com.pfe.backend_pfe.reposetory.PersonnelRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class InfermierService implements IInfermierService {

    private final PersonnelRepo pR;
    private final InfermierRepo iR;
    private final PasswordEncoder pE;

    @Override
    public CountInf voireNombreDocs(Long id) throws PersonnelNotFOundException {
        Personnel p=pR.findById(id).orElseThrow(()->new PersonnelNotFOundException("Personnel not found"));
        CountInf countInf=new CountInf();
        countInf.setCountInf(iR.FindCountINfermier(p.getHopital().getId_hopital()));
        return countInf;
    }

    @Override
    public List<String> listSpecInfermier(){
        return iR.findInfermierSpecialite();
    }

    @Override
    public PageInfermierDto voireMedcines(Long id, String nom, String cin, String spec, int page, int size) throws PersonnelNotFOundException, InfermierNotFoundException {
        Personnel p=pR.findById(id).orElseThrow(()->new PersonnelNotFOundException("Personnel not found"));
        Page<InfermierVoirDto> inf=iR.findAllBySpecialiteOrNom(p.getHopital().getId_hopital(),nom,spec,cin, PageRequest.of(page, size));
        if (inf == null) {
            throw new InfermierNotFoundException("Infermier not found");
        }
        PageInfermierDto dto=new PageInfermierDto();
        dto.setInfs(inf.getContent());
        dto.setPageSize(size);
        dto.setCurrentPage(page);
        dto.setTotalPages(inf.getTotalPages());
        return dto;
    }

    @Override
    public void creerOuModifierInf(CreationInfDto c, Long idPersonnel) throws PersonnelNotFOundException, DateApresException {
        Personnel p = pR.findById(idPersonnel)
                .orElseThrow(() -> new PersonnelNotFOundException("Personnel not found"));
        Infermier inf;
        if (c.getId() != null) {
            inf = iR.findById(c.getId())
                    .orElseThrow(() -> new PersonnelNotFOundException("Medecin not found"));
        } else {
            inf = new Infermier();
            inf.setHopital(p.getHopital());
        }
        inf.setCin(c.getCin());
        inf.setNom(c.getNom());
        inf.setPrenom(c.getPrenom());
        inf.setEmail(c.getMail());
        inf.setTelephone(c.getTel());
        inf.setAge(c.getAge());
        inf.setDescription(c.getDescription());
        inf.setSpecialite(c.getSpecialite());
        if(c.getDateArrivee().before(new Date())) {
            inf.setDate_sortie(c.getDateArrivee());
        }
        else{
            throw new DateApresException("date est apres la date de aujourdui");
        }
        if (c.getPassword() != null && !c.getPassword().trim().isEmpty()) {
            inf.setPassword(pE.encode(c.getPassword()));
        } else if (c.getId() == null) {
            throw new IllegalArgumentException("Password obligatoire en création");
        }
        iR.save(inf);

    }

    @Override
    public CreationInfDto voireMed(Long id) throws  PersonnelNotFOundException {
        Infermier inf = iR.findById(id)
                .orElseThrow(() -> new PersonnelNotFOundException("infermier not found"));

        CreationInfDto c = new CreationInfDto();

        c.setId(inf.getId());
        c.setCin(inf.getCin());
        c.setNom(inf.getNom());
        c.setPrenom(inf.getPrenom());
        c.setMail(inf.getEmail());
        c.setTel(inf.getTelephone());
        c.setAge(inf.getAge());
        c.setDescription(inf.getDescription());
        c.setSpecialite(inf.getSpecialite());
        c.setDateArrivee(inf.getDate_arrivee());
       // c.setPassword(inf.getPassword());

        return c;
    }

    @Override
    public void supprimerDepuisHopital(Long id) throws PersonnelNotFOundException {
        Infermier inf = iR.findById(id)
                .orElseThrow(() ->
                        new PersonnelNotFOundException("Infermier not found"));

        inf.setHopital(null);

        iR.save(inf);
    }
}
