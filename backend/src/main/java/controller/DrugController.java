package controller;

import model.Drug;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import service.DrugService;

import java.util.List;

@RestController
public class DrugController {

    @Autowired
    private DrugService drugService;


    //find drug by name
    @RequestMapping(path = "/drugs/search", method = RequestMethod.GET)
    public List<Drug> findDrug(@RequestParam String name){
        return drugService.findDrug(name);
    }

    //Add new Drug
    @RequestMapping(path = "/drug/add", method = RequestMethod.POST)
    public int addDrug(@RequestBody Drug drug){
        return drugService.addDrug(drug);
    }

    //Delete Drug
    @RequestMapping(path = "/drug", method = RequestMethod.DELETE)
    public String deleteDrug(@RequestParam  int id){
        drugService.deleteDrug(id);
        return "Deleted Drug ID : "+id;
    }

    //Update Drug
    @RequestMapping(path = "/drug/update", method = RequestMethod.PUT)
    public int updateDrug(@RequestBody Drug drug){
        return drugService.updateDrug(drug);
    }


}
