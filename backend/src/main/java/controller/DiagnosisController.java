package controller;

import model.Diagnosis;
import model.MedicalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import service.DiagnosisService;

import java.util.List;

@RestController
@RequestMapping(path = {"/"})
public class DiagnosisController {
    @Autowired
    private DiagnosisService diagnosisService;

    @RequestMapping(
            path = {"diagnoses"},
            method = {RequestMethod.GET}
    )
    public List<Diagnosis> getAllDiagnoses() {
        return this.diagnosisService.getAllDiagnoses();
    }

    @RequestMapping(
            path = {"diagnose/{id}"},
            method = {RequestMethod.GET}
    )
    public Diagnosis getDiagnoses(@PathVariable int id) {
        return this.diagnosisService.getDiagnoses(id);
    }


    @RequestMapping(
            path = {"diagnoses"},
            method = {RequestMethod.POST}
    )
    public Diagnosis addDiagnosis(@RequestBody Diagnosis diagnosis) {
        return this.diagnosisService.addDiagnosis(diagnosis);
    }


    @RequestMapping(
            path = {"diagnoses/{id}"},
            method = {RequestMethod.DELETE}
    )
    public void deleteDiagnosis(@PathVariable int id) {
        this.diagnosisService.deleteDiagnosis(id);
    }

    @RequestMapping(
            path = {"visit/diagnose/{id}"},
            method = {RequestMethod.GET}
    )
    public Diagnosis getDiagnosesByVisit(@PathVariable int id) {
        return this.diagnosisService.getDiagnosesByVisit(id);
    }


    @RequestMapping(
            path = {"labTest"},
            method = {RequestMethod.POST}
    )
    public List<MedicalService> labTest(@RequestBody int[] ids) {
        return this.diagnosisService.labTest(ids);
    }
    @RequestMapping(
            path = {"md"},
            method = {RequestMethod.POST}
    )
    public MedicalService medicalService(@RequestBody int id) {
        return this.diagnosisService.matchMedical(id);
    }
}
