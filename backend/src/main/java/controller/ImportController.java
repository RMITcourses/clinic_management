package controller;

import java.util.List;
import model.Disease;
import model.Drug;
import model.MedicalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import service.ImportService;

@RestController
@RequestMapping(
        path = {"/"}
)
public class ImportController {
    @Autowired
    private ImportService importService;

    @RequestMapping(
            path = {"icds"},
            method = {RequestMethod.GET}
    )
    public List<Disease> getICDs() {
        return this.importService.getICDs();
    }

    @RequestMapping(
            path = {"drugs"},
            method = {RequestMethod.GET}
    )
    public List<Drug> getAllDrugs() {
        return this.importService.getAllDrugs();
    }

    @RequestMapping(
            path = {"medicalServices"},
            method = {RequestMethod.GET}
    )
    public List<MedicalService> getMedicalServices() {
        return this.importService.getMedicalServices();
    }

    @RequestMapping(
            path = {"icds/{id}"},
            method = {RequestMethod.GET}
    )
    public Disease getICD(@PathVariable int id) {
        return this.importService.getICD(id);
    }

    @RequestMapping(
            path = {"drugs/{id}"},
            method = {RequestMethod.GET}
    )
    public Drug getDrug(@PathVariable int id) {
        return this.importService.getDrug(id);
    }

    @RequestMapping(
            path = {"medicalServices/{id}"},
            method = {RequestMethod.GET}
    )
    public MedicalService getMedicalService(@PathVariable int id) {
        return this.importService.getMedicalService(id);
    }

}
