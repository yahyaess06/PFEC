package com.pfe.backend_pfe.Presentation.Principale;
import com.pfe.backend_pfe.DTO.PrincipaleDto;
import com.pfe.backend_pfe.Metier.principale.IprincipaleService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
public class principaleController {
        private IprincipaleService ph;

        @GetMapping("/Regions")
        public List<PrincipaleDto> voireDonneePrincipale(){
            return ph.voireDonneePrincipale();
        }

    }


