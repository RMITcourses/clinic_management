package service;

import model.LabTest;
import model.LabTestDetail;
import model.MedicalService;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class LabTestService {
    @Autowired
    private SessionFactory sessionFactory;

    public LabTest addLabTest(LabTest labTest) {
        if(labTest.getLabTestDetails()!=null){
            for (LabTestDetail detail: labTest.getLabTestDetails()){
                detail.setLabtest(labTest);
            }
        }
        this.sessionFactory.getCurrentSession().saveOrUpdate(labTest);
        return labTest;
    }

    public LabTest update(LabTest labTest) {
        if(labTest.getLabTestDetails()!=null){
            for (LabTestDetail detail: labTest.getLabTestDetails()){
                detail.setLabtest(labTest);
            }
        }
        this.sessionFactory.getCurrentSession().update(labTest);
        return labTest;
    }

    public List<LabTest> getAllLabTests() {
        return this.sessionFactory.getCurrentSession().createQuery("from LabTest").list();
    }


    public LabTest updateLabTest(LabTest labTest) {
        if(labTest.getLabTestDetails()!=null){
            for (LabTestDetail detail: labTest.getLabTestDetails()){
                detail.setLabtest(labTest);
            }
        }
        this.sessionFactory.getCurrentSession().update(labTest);
        return labTest;
    }


    public List<MedicalService> matchlabTest(int[] ids){
        List<MedicalService> medicalServices = new ArrayList<>();
        for (int id : ids) {
            medicalServices.add(matchMedical(id));
        }
        return medicalServices;
    }


    public List<LabTestDetail> matchServiceToLabTest(int[] ids){
        List<MedicalService> medicalServices = matchlabTest(ids);
        List<LabTestDetail> labTestDetails = new ArrayList<>();
//        for (int i = 0; i <medicalServices.size() ; i++) {
//            labTestDetails.get(i).setServices(medicalServices.get(i));
//        }
        for (MedicalService md: medicalServices) {
            LabTestDetail detail = new LabTestDetail();
            detail.setServices(md);
            labTestDetails.add(detail);
        }
        return labTestDetails;
    }
    public MedicalService matchMedical(int id)  {
        Query query = sessionFactory.getCurrentSession().createQuery("from MedicalService where id=:id");
        query.setInteger("id", id);
        MedicalService medicalService = (MedicalService) query.uniqueResult();
        return medicalService ;
    }
}
