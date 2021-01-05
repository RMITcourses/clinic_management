package model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "prescription")
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column
    private String problems;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Diagnosis diagnosis;

    @OneToMany(mappedBy = "prescription",cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<PrescriptionDetail> details;



    public Prescription() {
    }

    public Diagnosis getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(Diagnosis diagnosis) {
        this.diagnosis = diagnosis;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<PrescriptionDetail> getDetails() {
        return details;
    }

    public void setDetails(List<PrescriptionDetail> details) {
        this.details = details;
    }

    public String getProblems() {
        return problems;
    }

    public void setProblems(String problems) {
        this.problems = problems;
    }
}
