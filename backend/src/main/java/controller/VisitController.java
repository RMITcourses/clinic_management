package controller;

import java.util.List;

import model.Visit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import service.VisitService;

@RestController
public class VisitController {
    @Autowired
    private VisitService visitService;

    public VisitController() {
    }


    @RequestMapping(
            path = {"/visits"},
            method = {RequestMethod.POST}
    )
    public Visit addVisit(@RequestBody Visit visit) {
        return this.visitService.addVisit(visit);
    }

    @RequestMapping(
            path = {"/visits"},
            method = {RequestMethod.GET}
    )
    public List<Visit> getVisits() {
        return this.visitService.getAllVisits();
    }

    @RequestMapping(
            path = {"/visits/current"},
            method = {RequestMethod.GET}
    )
    public List<Visit> getCurrentVisits() {
        return this.visitService.getCurrentVisits();
    }

    @RequestMapping(
            path = {"/visits/{id}"},
            method = {RequestMethod.GET}
    )
    public Visit getVisit(@PathVariable int id) {
        return this.visitService.getVisit(id);
    }

    @RequestMapping(
            path = {"/visits/{id}"},
            method = {RequestMethod.DELETE}
    )
    public void deleteVisit(@PathVariable int id) {
        this.visitService.deleteVisit(id);
    }

    @RequestMapping(
            path = {"/visits"},
            method = {RequestMethod.PUT}
    )
    public void updateVisit(@RequestBody Visit visit) {
        this.visitService.updateVisit(visit);
    }

    @RequestMapping(
            path = {"/visits/checkout/{id}"},
            method = {RequestMethod.GET}
    )
    public void checkOut(@PathVariable int id) {
        this.visitService.checkout(id);
    }

    @RequestMapping(
            path = {"/visitsByDay"},
            method = {RequestMethod.GET}
    )
    public List<Visit> getVisits(@RequestParam("date") String date) {
        return this.visitService.getVisits(date);
    }

    @RequestMapping(
            path = {"/visitsByPatient"},
            method = {RequestMethod.GET}
    )
    public List<Visit> getVisits(@RequestParam("patientId") int patientId) {
        return this.visitService.getVisits(patientId);
    }

}
