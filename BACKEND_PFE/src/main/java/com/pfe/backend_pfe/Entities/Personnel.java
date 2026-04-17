package com.pfe.backend_pfe.Entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@Entity
@Table(name = "personnel")
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@Getter
@Setter
@ToString
@PrimaryKeyJoinColumn(name = "user_id")
@Inheritance(strategy = InheritanceType.JOINED)
public class Personnel extends User {
    //@Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id_personnel;
    private Date date_arrivee;
    private Date date_sortie;

    @ManyToOne
    private Hopital hopital;
}
