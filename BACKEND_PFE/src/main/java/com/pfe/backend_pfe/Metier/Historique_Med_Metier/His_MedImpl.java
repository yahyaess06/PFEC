package com.pfe.backend_pfe.Metier.Historique_Med_Metier;

import com.itextpdf.kernel.colors.Color;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.SolidBorder;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Div;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.BorderRadius;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import com.pfe.backend_pfe.DTO.HistoriqueMedicalPatient.H_MedicalDto;
import com.pfe.backend_pfe.DTO.HistoriqueMedicalPatient.Patient_HistoryM;
import com.pfe.backend_pfe.Entities.*;
import com.pfe.backend_pfe.Exceptions.DossierNotFoundException;
import com.pfe.backend_pfe.reposetory.DossierRepo;
import com.pfe.backend_pfe.reposetory.OrdonnanceRepo;
import com.pfe.backend_pfe.reposetory.VaccinationRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;

import static java.awt.SystemColor.text;

@Service
@AllArgsConstructor
public class His_MedImpl implements His_MedMetier{

    private final DossierRepo dossierRepo;
    private final OrdonnanceRepo oR;
    private final VaccinationRepo vR;

    @Override
    public byte[] generatePdfs(Long p_id) {

        Dossier d = dossierRepo.findByPatient_Id(p_id).orElseThrow(
                () -> new RuntimeException("Dossier not found")
        );

        try (ByteArrayOutputStream b = new ByteArrayOutputStream()) {

            PdfWriter w = new PdfWriter(b);
            PdfDocument pdf = new PdfDocument(w);
            //--
            pdf.setDefaultPageSize(PageSize.A4.rotate());
            //--
            Document doc = new Document(pdf);

            Color headerColor = new DeviceRgb(41, 128, 185);
            Color lightGray = new DeviceRgb(245, 245, 245);

            Paragraph hospital = new Paragraph("SYSTEME HOSPITALIER")
                    .setFontSize(14)
                    .setBold()
                    .setFontColor(headerColor)
                    .setTextAlignment(TextAlignment.CENTER);
            doc.add(hospital);
            Paragraph title = new Paragraph("DOSSIER MEDICAL DU PATIENT")
                    .setFontSize(22)
                    .setBold()
                    .setTextAlignment(TextAlignment.CENTER);

            doc.add(title);

            Paragraph patient = new Paragraph(
                    "Patient : " + d.getPatient().getNom() + " " + d.getPatient().getPrenom())
                    .setFontSize(12)
                    .setTextAlignment(TextAlignment.CENTER);

            doc.add(patient);
            doc.add(new Paragraph("\n"));
            Div card = new Div()
                    .setBackgroundColor(lightGray)
                    .setPadding(12)
                    .setBorderRadius(new BorderRadius(6));


            String groupe = d.getG_sanguin() != null
                    ? d.getG_sanguin().name()
                    : "Aucun";
//            String groupe = d.getG_sanguin() != null ? d.getG_sanguin().name() : "Aucun";
            String allergies = d.getAllergies_notees() != null ? d.getAllergies_notees() : "Aucun";
            String traitements = d.getTraitements_actuels() != null ? d.getTraitements_actuels() : "Aucun";

            card.add(new Paragraph("Groupe sanguin : " + groupe).setBold());
            card.add(new Paragraph("Allergies : " + allergies));
            card.add(new Paragraph("Traitements actuels : " + traitements));

//            card.add(new Paragraph("Groupe sanguin : " + d.getG_sanguin()).setBold());
//            card.add(new Paragraph("Allergies : " + d.getAllergies_notees()));
//            card.add(new Paragraph("Traitements actuels : " + d.getTraitements_actuels()));

            doc.add(card);

            doc.add(new Paragraph("\n"));
            Paragraph sectionOrd = new Paragraph("Historique des Consultations")
                    .setFontSize(16)
                    .setBold()
                    .setFontColor(headerColor);

            doc.add(sectionOrd);
            doc.add(new Paragraph("\n"));
//            Table table = new Table(UnitValue.createPercentArray(
//                    new float[]{2,3,3,4,4,3,4}))
//                    .useAllAvailableWidth();
            Table table = new Table(UnitValue.createPercentArray(
                    new float[]{2, 3, 3, 4, 4, 3, 5}))
                    .useAllAvailableWidth();

            addHeader(table,"Date",headerColor);
            addHeader(table,"Médecin",headerColor);
            addHeader(table,"Spécialité",headerColor);
            addHeader(table,"Motif",headerColor);
            addHeader(table,"Diagnostic",headerColor);
            addHeader(table,"Hôpital",headerColor);
            addHeader(table,"Médicaments",headerColor);

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

            Collection<Ordonnance> ods = d.getOrdonnances();
            ods.removeIf(ord->ord.getMedecin()==null);

            int row = 0;

            for(Ordonnance ord : ods){

                String medicaments="";
                if(ord.getMedicaments()!=null && !ord.getMedicaments().isEmpty()){
                    for(int i=0;i<ord.getMedicaments().size();i++){

                        medicaments+=ord.getMedicaments().get(i).getNom();
                        if(i<ord.getMedicaments().size()-1){
                            medicaments+=" - ";
                        }
                    }
                }
                if (medicaments.trim().isEmpty()) {
                    medicaments = "-";
                }

                Color bg = (row % 2 == 0) ? ColorConstants.WHITE : lightGray;

                table.addCell(createCell(
                        ord.getDateOrdonnance().toInstant()
                                .atZone(ZoneId.systemDefault())
                                .toLocalDate()
                                .format(formatter), bg));

                table.addCell(createCell(
                        "Dr. "+ord.getMedecin().getPrenom()+" "+ord.getMedecin().getNom(), bg));

                table.addCell(createCell(
                        ord.getMedecin().getSpecialite().getNomspec(), bg));

                //--
                String motif = (ord.getMotif_viste() != null && !ord.getMotif_viste().trim().isEmpty())
                        ? ord.getMotif_viste()
                        : "-";

                table.addCell(createCell(motif, bg));

                String diagnostic = (ord.getDiagnostic() != null && !ord.getDiagnostic().trim().isEmpty())
                        ? ord.getDiagnostic()
                        : "-";

                table.addCell(createCell(diagnostic, bg));
//                String motif = (ord.getMotif_viste() !=null ? ord.getMotif_viste().trim() : "Aucun Motif");
//                table.addCell(createCell(
//                        ord.getMotif_viste(), bg));
//                table.addCell(createCell(motif, bg));
//                String diagnostic = ord.getDiagnostic() !=null ? ord.getDiagnostic().trim() : "Aucun diagnostic";
//                table.addCell(createCell(
//                        ord.getDiagnostic(), bg));
//                table.addCell(createCell(diagnostic, bg));
//--
                table.addCell(createCell(
                        ord.getMedecin().getHopital().getNom_hopital(), bg));

                table.addCell(createCell(
                        medicaments, bg));

                row++;
            }

            doc.add(table);

            doc.add(new Paragraph("\n"));

            Paragraph vaccTitle = new Paragraph("Historique des Vaccinations")
                    .setFontSize(16)
                    .setBold()
                    .setFontColor(headerColor);

            doc.add(vaccTitle);
            doc.add(new Paragraph("\n"));

            Table tableVacc = new Table(UnitValue.createPercentArray(
                    new float[]{2,3,3,3,4,3,3}))
                    .useAllAvailableWidth();

            addHeader(tableVacc,"Date",headerColor);
            addHeader(tableVacc,"Infirmier",headerColor);
            addHeader(tableVacc,"Spécialité",headerColor);
            addHeader(tableVacc,"Motif",headerColor);
            addHeader(tableVacc,"Observation",headerColor);
            addHeader(tableVacc,"Hôpital",headerColor);
            addHeader(tableVacc,"Vaccin",headerColor);

            int row2=0;

            d.getVaccinations().stream()
                    .filter(v->v.getInfermierV()!=null)
                    .forEach(v->{

                        Color bg = (row2 % 2 == 0) ? ColorConstants.WHITE : lightGray;
                        String observation = (v.getObservation() != null && !v.getObservation().trim().isEmpty()) ? v.getObservation() : "-";
                        String motifV = (v.getMotif() != null && !v.getMotif().trim().isEmpty()) ? v.getMotif() : "-";
                        String nameVcci = (v.getNomVaccin() != null && !v.getNomVaccin().trim().isEmpty()) ? v.getNomVaccin() : "-";

                        tableVacc.addCell(createCell(
                                v.getDateVaccin().toInstant()
                                        .atZone(ZoneId.systemDefault())
                                        .toLocalDate()
                                        .format(DateTimeFormatter.ofPattern("dd/MM/yyyy")), bg));

                        tableVacc.addCell(createCell(
                                v.getInfermierV().getNom()+" "+v.getInfermierV().getPrenom(), bg));

                        tableVacc.addCell(createCell(
                                v.getInfermierV().getSpecialite(), bg));

//                        tableVacc.addCell(createCell(
//                                v.getMotif(), bg));
                        tableVacc.addCell(createCell(
                                motifV, bg));
//                        tableVacc.addCell(createCell(
//                                v.getObservation(), bg));
                        tableVacc.addCell(createCell(
                                observation, bg));
                        tableVacc.addCell(createCell(
                                v.getInfermierV().getHopital().getNom_hopital(), bg));

//                        tableVacc.addCell(createCell(
//                                v.getNomVaccin(), bg));
                        tableVacc.addCell(createCell(
                                nameVcci, bg));
                    });

            doc.add(tableVacc);
            doc.add(new Paragraph("\n\n"));

            Paragraph footer = new Paragraph(
                    "Document médical confidentiel - Généré automatiquement")
                    .setTextAlignment(TextAlignment.CENTER)
                    .setFontSize(10)
                    .setFontColor(ColorConstants.GRAY);

            doc.add(footer);

            doc.close();

            return b.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Error generating PDF", e);
        }
    }
    private Cell createCell(String value,Color bg){

        return new Cell()
                .add(new Paragraph(value))
                .setBackgroundColor(bg)
                .setTextAlignment(TextAlignment.CENTER)
                //---
                .setMinHeight(20)
                //---
                .setFontSize(9)
                .setPadding(5);
    }


    @Override
    public byte[] generatePdfOrdById(Long ordId) {

        Ordonnance o = oR.findById(ordId)
                .orElseThrow(() -> new RuntimeException("ordonnance not found"));

        try (ByteArrayOutputStream b = new ByteArrayOutputStream()) {

            PdfWriter w = new PdfWriter(b);
            PdfDocument pdf = new PdfDocument(w);
            Document doc = new Document(pdf);

            Color headerColor = new DeviceRgb(41,128,185);
            Color lightGray = new DeviceRgb(245,245,245);

            Paragraph hospital = new Paragraph("SYSTEME HOSPITALIER")
                    .setTextAlignment(TextAlignment.CENTER)
                    .setFontSize(14)
                    .setBold()
                    .setFontColor(headerColor);

            doc.add(hospital);

            Paragraph t = new Paragraph(
                    "ORDONNANCE MEDICALE"
            )
                    .setTextAlignment(TextAlignment.CENTER)
                    .setFontSize(22)
                    .setBold();

            doc.add(t);

            Paragraph patient = new Paragraph(
                    "Patient : " +
                            o.getDossiers().getPatient().getNom() + " " +
                            o.getDossiers().getPatient().getPrenom())
                    .setTextAlignment(TextAlignment.CENTER)
                    .setFontSize(12);

            doc.add(patient);

            doc.add(new Paragraph("\n"));

            Div card = new Div()
                    .setBackgroundColor(lightGray)
                    .setPadding(12)
                    .setBorderRadius(new BorderRadius(6));

            card.add(new Paragraph(
                    "Date : " +
                            o.getDateOrdonnance().toInstant()
                                    .atZone(ZoneId.systemDefault())
                                    .toLocalDate()
                                    .format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))
            ));

            card.add(new Paragraph(
                    "Médecin : Dr. " +
                            o.getMedecin().getPrenom() + " " +
                            o.getMedecin().getNom()
            ));

            card.add(new Paragraph(
                    "Spécialité : " +
                            o.getMedecin().getSpecialite().getNomspec()
            ));

            card.add(new Paragraph(
                    "Hôpital : " +
                            o.getMedecin().getHopital().getNom_hopital()
            ));

            doc.add(card);

            doc.add(new Paragraph("\n"));

            Paragraph section = new Paragraph("Détails de la consultation")
                    .setFontSize(16)
                    .setBold()
                    .setFontColor(headerColor);

            doc.add(section);

            doc.add(new Paragraph("\n"));

            Div consultationBox = new Div()
                    .setPadding(10)
                    .setBorder(new SolidBorder(ColorConstants.LIGHT_GRAY,1));

            String motif = (o.getMotif_viste() != null && !o.getMotif_viste().trim().isEmpty())
                    ? o.getMotif_viste()
                    : "Aucun motif";

            String diagnostic = (o.getDiagnostic() != null && !o.getDiagnostic().trim().isEmpty())
                    ? o.getDiagnostic()
                    : "Aucun diagnostic";
            //            consultationBox.add(new Paragraph("Motif : " + o.getMotif_viste()));
            consultationBox.add(new Paragraph("Motif : " + motif));
//            consultationBox.add(new Paragraph("Diagnostic : " + o.getDiagnostic()));
            consultationBox.add(new Paragraph("Diagnostic : " + diagnostic));

            doc.add(consultationBox);

            doc.add(new Paragraph("\n"));

            Paragraph medsTitle = new Paragraph("Prescription Médicamenteuse")
                    .setFontSize(16)
                    .setBold()
                    .setFontColor(headerColor);

            doc.add(medsTitle);

            doc.add(new Paragraph("\n"));

            Div medsBox = new Div()
                    .setBackgroundColor(lightGray)
                    .setPadding(10)
                    .setBorderRadius(new BorderRadius(6));

            if (o.getMedicaments() != null && !o.getMedicaments().isEmpty()) {

                o.getMedicaments().forEach(med ->
                        medsBox.add(new Paragraph("• " + med.getNom()))
                );

            } else {

                medsBox.add(new Paragraph("Aucun médicament prescrit."));
            }

            doc.add(medsBox);

            doc.add(new Paragraph("\n\n"));


            doc.add(new Paragraph("\n"));

            Paragraph footer = new Paragraph(
                    "Document médical confidentiel - Généré automatiquement par le système hospitalier"
            )
                    .setTextAlignment(TextAlignment.CENTER)
                    .setFontSize(10)
                    .setFontColor(ColorConstants.GRAY);

            doc.add(footer);

            doc.close();

            return b.toByteArray();

        } catch (Exception e) {

            throw new RuntimeException("Erreur generation pdf !!", e);
        }
    }

    @Override
    public byte[] genereatePdfVccId(Long vccId) {

        Vaccination v = vR.findById(vccId)
                .orElseThrow(() -> new RuntimeException("vaccination not found"));

        try (ByteArrayOutputStream b = new ByteArrayOutputStream()) {

            PdfWriter w = new PdfWriter(b);
            PdfDocument pdf = new PdfDocument(w);
            Document doc = new Document(pdf);

            Color headerColor = new DeviceRgb(41,128,185);
            Color lightGray = new DeviceRgb(245,245,245);

//            Paragraph watermark = new Paragraph("CONFIDENTIEL MEDICAL")
//                    .setFontSize(60)
//                    .setFontColor(new DeviceRgb(220,220,220))
//                    .setRotationAngle(Math.toRadians(45));
//
//            doc.showTextAligned(watermark, 297, 421, TextAlignment.CENTER);

            Paragraph hospital = new Paragraph("SYSTEME HOSPITALIER")
                    .setTextAlignment(TextAlignment.CENTER)
                    .setFontSize(14)
                    .setBold()
                    .setFontColor(headerColor);

            doc.add(hospital);

            Paragraph t = new Paragraph("CERTIFICAT DE VACCINATION")
                    .setTextAlignment(TextAlignment.CENTER)
                    .setFontSize(22)
                    .setBold();

            doc.add(t);

            Paragraph patient = new Paragraph(
                    "Patient : "
                            + v.getDossierV().getPatient().getNom() + " "
                            + v.getDossierV().getPatient().getPrenom())
                    .setTextAlignment(TextAlignment.CENTER)
                    .setFontSize(12);

            doc.add(patient);

            doc.add(new Paragraph("\n"));

            Div card = new Div()
                    .setBackgroundColor(lightGray)
                    .setPadding(12)
                    .setBorderRadius(new BorderRadius(6));

            card.add(new Paragraph(
                    "Date : "
                            + v.getDateVaccin().toInstant()
                            .atZone(ZoneId.systemDefault())
                            .toLocalDate()
                            .format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))
            ));

            card.add(new Paragraph(
                    "Infirmier : "
                            + v.getInfermierV().getNom() + " "
                            + v.getInfermierV().getPrenom()
            ));

            card.add(new Paragraph(
                    "Spécialité : "
                            + v.getInfermierV().getSpecialite()
            ));

            card.add(new Paragraph(
                    "Hôpital : "
                            + v.getInfermierV().getHopital().getNom_hopital()
            ));

            doc.add(card);

            doc.add(new Paragraph("\n"));

            Paragraph section = new Paragraph("Détails de la Vaccination")
                    .setFontSize(16)
                    .setBold()
                    .setFontColor(headerColor);

            doc.add(section);
            doc.add(new Paragraph("\n"));

            Div vaccBox = new Div()
                    .setPadding(10)
                    .setBorder(new SolidBorder(ColorConstants.LIGHT_GRAY,1));
//            String nameVacc = v.getNomVaccin() != null ? v.getNomVaccin() : "Aucun Vaccin";
//            String observ = v.getObservation() != null ? v.getObservation() : "Aucun Observation";
//            String motif = v.getMotif() != null ? v.getMotif() : "Aucun Motif";

            String nameVacc = (v.getNomVaccin() != null && !v.getNomVaccin().trim().isEmpty()) ? v.getNomVaccin() : "Aucun vaccin";
            String motif = (v.getMotif() != null && !v.getMotif().trim().isEmpty()) ? v.getMotif() : "Aucun motif";
            String observ = (v.getObservation() != null && !v.getObservation().trim().isEmpty()) ? v.getObservation() : "Aucune observation";

//            vaccBox.add(new Paragraph("Vaccin : " + v.getNomVaccin()));
//            vaccBox.add(new Paragraph("Motif : " + v.getMotif()));
//            vaccBox.add(new Paragraph("Observation : " + v.getObservation()));
            vaccBox.add(new Paragraph("Vaccin : " + nameVacc));
            vaccBox.add(new Paragraph("Motif : " + motif));
            vaccBox.add(new Paragraph("Observation : " + observ));  doc.add(vaccBox);

            doc.add(new Paragraph("\n\n"));


            doc.add(new Paragraph("\n"));

            Paragraph footer = new Paragraph(
                    "Document médical confidentiel - Généré automatiquement par le système hospitalier")
                    .setTextAlignment(TextAlignment.CENTER)
                    .setFontSize(10)
                    .setFontColor(ColorConstants.GRAY);

            doc.add(footer);

            doc.close();

            return b.toByteArray();

        } catch (Exception e) {

            throw new RuntimeException("Erreur generation pdf !!", e);
        }
    }

    private void addHeader(Table table,String title,Color color){

        Cell header = new Cell()
                .add(new Paragraph(title).setBold().setFontColor(ColorConstants.WHITE))
                .setBackgroundColor(color)
                .setTextAlignment(TextAlignment.CENTER);

        table.addHeaderCell(header);
    }

    @Override
    public H_MedicalDto getHistoriqueVcc(Long patientId) throws DossierNotFoundException {
        Dossier d = dossierRepo.findByPatient_Id(patientId).orElseThrow(()->new DossierNotFoundException("dossier nott found"));
        List<Patient_HistoryM> vaccHistory = d.getVaccinations().stream()
                .filter(vcc->vcc.getInfermierV() != null) // hadi equivalant dyal if (vcc.getInfermierV!=nulll){ .map(...)}
                .map(v->new Patient_HistoryM(
                        v.getIdVaccin(),
                        v.getDateVaccin(),
                        "Dr. "+v.getInfermierV().getNom()+" "+v.getInfermierV().getPrenom(),
                        v.getInfermierV().getSpecialite(),//specialite 3la hasab madar yahya f test (Soins)
                        v.getMotif(),
                        v.getObservation(),
                        v.getInfermierV().getHopital().getNom_hopital(),
                        v.getNomVaccin(),
                        null

                )).toList();

        return new H_MedicalDto(
                d.getG_sanguin(),
                d.getAllergies_notees(),
                d.getTraitements_actuels(),
                new ArrayList<>(),
                vaccHistory
        );
    }

    @Override
    public H_MedicalDto getHistoriqueMed(Long patientId) {

        Dossier dossier = dossierRepo
                .findByPatient_Id(patientId)
                .orElseThrow(() -> new RuntimeException("Dossier not found"));

        List<Patient_HistoryM> pHistoriques = dossier.getOrdonnances().stream()
                .map(ord-> {
                    String medicaments = "";
                    if (ord.getMedicaments() != null && !ord.getMedicaments().isEmpty()) {
                        for (int i = 0; i < ord.getMedicaments().size(); i++) {
                            medicaments += ord.getMedicaments().get(i).getNom();
                            if (i < ord.getMedicaments().size() - 1) {
                                medicaments += " - ";
                            }
                        }
                    }
                    return new Patient_HistoryM(
                            ord.getIdOrdonnance(),// zadt
                            ord.getDateOrdonnance(),
                            "Dr. " + ord.getMedecin().getPrenom() + " " +
                                    ord.getMedecin().getNom(),
                            ord.getMedecin().getSpecialite().getNomspec(),
                            ord.getMotif_viste(),
                            ord.getDiagnostic(),
                            ord.getMedecin().getHopital().getNom_hopital(),
                            medicaments,
                            null
                    );
                }).toList();

                //ord Infermier
                    List<Patient_HistoryM> inferOrdHistory = dossier.getVaccinations().stream()
                            .filter(vcc->vcc.getInfermierV() != null) // hadi equivalant dyal if (vcc.getInfermierV!=nulll){ .map(...)}
                            .map(v->new Patient_HistoryM(
                                    v.getIdVaccin(),
                                    v.getDateVaccin(),
                                    "Dr. "+v.getInfermierV().getNom()+" "+v.getInfermierV().getPrenom(),
                                    v.getInfermierV().getSpecialite(),//specialite 3la hasab madar yahya f test (Soins)
                                    v.getMotif(),
                                    v.getObservation(),
                                    v.getInfermierV().getHopital().getNom_hopital(),
                                    v.getNomVaccin(),
                                    null

                            )).toList();

        return new H_MedicalDto(
                dossier.getG_sanguin(),
                dossier.getAllergies_notees(),
                dossier.getTraitements_actuels(),
                pHistoriques,
                inferOrdHistory
        );

        //github

    }
}
