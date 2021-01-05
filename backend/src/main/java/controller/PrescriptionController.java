package controller;

import java.util.List;
import model.Prescription;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import service.PrescriptionService;

@RestController
public class PrescriptionController {
    @Autowired
    private PrescriptionService prescriptionService;

    public PrescriptionController() {
    }

    @RequestMapping(
            path = {"/prescriptions"},
            method = {RequestMethod.POST}
    )
    public int addPrescription(@RequestBody Prescription prescription) {
        return this.prescriptionService.addPrescription(prescription);
    }

    @RequestMapping(
            path = {"/prescriptions"},
            method = {RequestMethod.GET}
    )
    public List<Prescription> getPrescriptions() {
        return this.prescriptionService.getAllPrescriptions();
    }

    @RequestMapping(
            path = {"/prescriptions/{id}"},
            method = {RequestMethod.GET}
    )
    public Prescription getPrescription(@PathVariable int id) {
        return this.prescriptionService.getPrescription(id);
    }

    //get pres by patient
    @RequestMapping(path = "prescription/patient", method = RequestMethod.GET)
    public List<Prescription> getPatientPrescription(@RequestParam int id){
        return prescriptionService.getAllPatientPrescription(id);
    }


    //Delete
    @RequestMapping(path = "/prescription", method = RequestMethod.DELETE)
    public String deletePrescription(@RequestParam  int id){
        prescriptionService.deletePrescription(id);
        return "Deleted prescription id: "+id;
    }

    //Update
    @RequestMapping(path = "/prescription", method = RequestMethod.PUT)
    public int updatePrescription(@RequestBody Prescription pres){
        return prescriptionService.updatePrescription(pres);
    }


    @RequestMapping(
            path = {"/prescriptionbyvisit/{id}"},
            method = {RequestMethod.GET}
    )
    public Prescription getPrescriptionByVisit(@PathVariable int id) {
        return this.prescriptionService.getPrescriptionByVisit(id);
    }

}
