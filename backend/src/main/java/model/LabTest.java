package model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
public class LabTest {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @OneToMany(mappedBy = "labtest",cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<LabTestDetail> labTestDetails;


    @Column
    private String notes;
    //Getter and Setter

    public LabTest() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<LabTestDetail> getLabTestDetails() {
        return labTestDetails;
    }

    public void setLabTestDetails(List<LabTestDetail> labTestDetails) {
        this.labTestDetails = labTestDetails;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
