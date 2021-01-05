package controller;

import java.util.List;
import model.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import service.PatientService;

@RestController
@RequestMapping(
        path = {"/"}
)
public class PatientController {
    @Autowired
    private PatientService patientService;

    public PatientController() {
    }

    @RequestMapping(
            path = {"patients"},
            method = {RequestMethod.POST}
    )
    public Patient addPatient(@RequestBody Patient patient) {
        return this.patientService.addPatient(patient);
    }

    @RequestMapping(
            path = {"patients"},
            method = {RequestMethod.GET}
    )
    public List<Patient> getPatients() {
        return this.patientService.getAllPatients();
    }

    @RequestMapping(
            path = {"patients/{id}"},
            method = {RequestMethod.GET}
    )
    public Patient getPatient(@PathVariable int id) {
        return this.patientService.getPatient(id);
    }

    @RequestMapping(
            path = {"patients/{id}"},
            method = {RequestMethod.DELETE}
    )
    public void deletePatient(@PathVariable int id) {
        this.patientService.deletePatient(id);
    }

    @RequestMapping(
            path = {"patients"},
            method = {RequestMethod.PUT}
    )
    public void updatePatient(@RequestBody Patient patient) {
        this.patientService.updatePatient(patient);
    }

    @RequestMapping(
            path = {"patientsByName"},
            method = {RequestMethod.GET}
    )
    public List<Patient> getPatientsByName(@RequestParam("name") String name) {
        return this.patientService.getPatientsByName(name);
    }

    @RequestMapping(
            path = {"patientsByDOB"},
            method = {RequestMethod.GET}
    )
    public List<Patient> getPatientsByDob(@RequestParam("dob") String date) {
        return this.patientService.getPatientsByDob(date);
    }
}
