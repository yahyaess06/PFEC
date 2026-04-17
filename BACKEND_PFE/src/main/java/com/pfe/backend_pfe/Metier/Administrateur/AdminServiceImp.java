package com.pfe.backend_pfe.Metier.Administrateur;

import com.pfe.backend_pfe.DTO.Administrateur.AdministrateurDTO;
import com.pfe.backend_pfe.DTO.Administrateur.PageAdministrateur;
import com.pfe.backend_pfe.DTO.CountInf;
import com.pfe.backend_pfe.Entities.Enumerations.User_Role;
import com.pfe.backend_pfe.Entities.Personnel;
import com.pfe.backend_pfe.Exceptions.DateApresException;
import com.pfe.backend_pfe.Exceptions.PersonnelNotFOundException;
import com.pfe.backend_pfe.Mappers.AdministrateurMappers;
import com.pfe.backend_pfe.reposetory.PersonnelRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Transactional
@AllArgsConstructor
public class AdminServiceImp implements IAdminService {

    private final PersonnelRepo pR;
    private final PasswordEncoder pE;
    private final AdministrateurMappers am;

    @Override
    public AdministrateurDTO voireAdmin(Long id) throws PersonnelNotFOundException {
        Personnel admin = pR.findById(id)
                .orElseThrow(() -> new PersonnelNotFOundException("Administrateur not found"));
        return am.mapToDto(admin);
    }

    @Override
    public AdministrateurDTO creerOuModifierAdmin(Long id,AdministrateurDTO dto) throws PersonnelNotFOundException, DateApresException {
        Personnel admin;

        if (dto.getId() != null) {
            admin = pR.findById(dto.getId())
                    .orElseThrow(() -> new PersonnelNotFOundException("Administrateur not found"));
        } else {
            admin = new Personnel();
            if (id == null) {
                throw new PersonnelNotFOundException("idPersonnelCreateur obligatoire en création");
            }
            Personnel creator = pR.findById(id)
                    .orElseThrow(() -> new PersonnelNotFOundException("Personnel createur not found"));
            admin.setHopital(creator.getHopital());
            admin.setRole(User_Role.ADMIN);
        }
        admin.setCin(dto.getCin());
        admin.setNom(dto.getNom());
        admin.setPrenom(dto.getPrenom());
        admin.setEmail(dto.getMail());
        admin.setTelephone(dto.getTel());
        admin.setAge(dto.getAge());
        if(dto.getDatearrive().before(new Date())) {
            admin.setDate_sortie(dto.getDatearrive());
        }
        else{
            throw new DateApresException("date est apres la date de aujourdui");
        }
        if (dto.getPassword() != null && !dto.getPassword().trim().isEmpty()) {
            admin.setPassword(pE.encode(dto.getPassword()));
        } else if (dto.getId() == null) {
            throw new IllegalArgumentException("Password obligatoire en création");
        }
        Personnel saved = pR.save(admin);
        return am.mapToDto(saved);
    }

    @Override
    public void supprimerDepuisHopital(Long id) throws PersonnelNotFOundException {
        Personnel admin = pR.findById(id)
                .orElseThrow(() -> new PersonnelNotFOundException("Administrateur not found"));

        admin.setHopital(null);
        pR.save(admin);
    }

    @Override
    public PageAdministrateur voireAdmins(Long idPersonnel, String nom, String cin, int page, int size)
            throws PersonnelNotFOundException {

        Personnel p = pR.findById(idPersonnel)
                .orElseThrow(() -> new PersonnelNotFOundException("Personnel not found"));

        Long hopitalId = p.getHopital().getId_hopital();

        Page<AdministrateurDTO> adminsPage = pR.findAdminsByHopitalAndNomOrCin(
                hopitalId,
                nom,
                cin,
                PageRequest.of(page, size)
        );
        adminsPage.forEach(admin -> {
            admin.setPassword(null);
        });
        PageAdministrateur res = new PageAdministrateur();
        res.setAds(adminsPage.getContent());
        res.setPageSize(size);
        res.setCurrentPage(page);
        res.setTotalPages(adminsPage.getTotalPages());
        return res;
    }

    @Override
    public CountInf voireNombreDocs(Long idPersonnel) throws PersonnelNotFOundException {
        Personnel p = pR.findById(idPersonnel)
                .orElseThrow(() -> new PersonnelNotFOundException("Personnel not found"));

        Long hopitalId = p.getHopital().getId_hopital();

        CountInf count = new CountInf();
        count.setCountInf(pR.countAdminsByHopital(hopitalId));
        return count;
    }
}