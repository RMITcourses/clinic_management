package service;

import model.Diagnosis;
import model.LabTest;
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
public class DiagnosisService {
    @Autowired
    private SessionFactory sessionFactory;

    public Diagnosis addDiagnosis(Diagnosis diagnosis) {
        this.sessionFactory.getCurrentSession().saveOrUpdate(diagnosis);
        return diagnosis;
    }

    public List<Diagnosis> getAllDiagnoses() {
        return this.sessionFactory.getCurrentSession().createQuery("from Diagnosis").list();
    }

    public void deleteDiagnosis(int id){
        Query query = sessionFactory.getCurrentSession().createQuery("from Diagnosis where id=:id");
        query.setInteger("id", id);
        Diagnosis diagnosis = (Diagnosis) query.uniqueResult();
        sessionFactory.getCurrentSession().delete(diagnosis);
    }

    public Diagnosis getDiagnoses(int id) {
        Query query = sessionFactory.getCurrentSession().createQuery("from Diagnosis where id=:id");
        query.setInteger("id", id);
        Diagnosis diagnosis = (Diagnosis) query.uniqueResult();
        return diagnosis;
    }

    public Diagnosis getDiagnosesByVisit(int id) {
        Query query = sessionFactory.getCurrentSession().createQuery("from Diagnosis where visit_id=:id");
        query.setInteger("id", id);
        Diagnosis diagnosis = (Diagnosis) query.uniqueResult();
        return diagnosis;
    }

    public Diagnosis addDiagnosisByVisit(Diagnosis diagnosis) {
        this.sessionFactory.getCurrentSession().saveOrUpdate(diagnosis);
        return diagnosis;
    }


    public List<MedicalService> labTest(int[] ids){
        List<MedicalService> medicalServices = new ArrayList<>();
        for (int id : ids) {
            medicalServices.add(matchMedical(id));
        }
        return medicalServices;
    }

    //================== Match =================

    public MedicalService matchMedical(int id)  {
        Query query = sessionFactory.getCurrentSession().createQuery("from MedicalService where id=:id");
        query.setInteger("id", id);
        MedicalService medicalService = (MedicalService) query.uniqueResult();
        return medicalService ;
    }

}
