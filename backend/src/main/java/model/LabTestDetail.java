package model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class LabTestDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    @JsonIgnore
    private LabTest labtest;

    @ManyToOne
    private MedicalService services;

    public LabTestDetail() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LabTest getLabtest() {
        return labtest;
    }

    public void setLabtest(LabTest labtest) {
        this.labtest = labtest;
    }

    public MedicalService getServices() {
        return services;
    }

    public void setServices(MedicalService services) {
        this.services = services;
    }
}
