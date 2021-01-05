package service;

import model.*;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class PrescriptionService {
    @Autowired
    private SessionFactory sessionFactory;


    public List<Prescription> getAllPrescriptions() {
        return this.sessionFactory.getCurrentSession().createQuery("from Prescription").list();
    }

    public Prescription getPrescription(int id) {
        Query query = this.sessionFactory.getCurrentSession().createQuery("from Prescription where id=:id");
        query.setInteger("id", id);
        return (Prescription)query.uniqueResult();
    }
    public Prescription getPrescriptionByVisit(int id) {
        Query query = this.sessionFactory.getCurrentSession()
                .createQuery("from Visit s where s.id=:id and p.id=s.prescription_id");

        query.setInteger("id", id);
        return (Prescription)query.uniqueResult();
    }

    public List<Prescription> getAllPatientPrescription(int id){
        Query query = sessionFactory.getCurrentSession()
                .createQuery("from Visit s, Prescription p where  p.patient_id=:id");
        query.setInteger("id",id);
        return query.list();
    }

    public int addPrescription(Prescription pres){
        pres = matchICD(pres);
        pres = matchDetails(pres);
        sessionFactory.getCurrentSession().save(pres);
        return pres.getId();
    }

    public void deletePrescription(int id){
        Query query = sessionFactory.getCurrentSession().createQuery("from Prescription where id=:id");
        query.setInteger("id", id);
        Prescription pres = (Prescription) query.uniqueResult();
        sessionFactory.getCurrentSession().delete(pres);
    }

    public int updatePrescription(Prescription pres){
        pres = matchICD(pres);
        pres = matchDetails(pres);
        sessionFactory.getCurrentSession().update(pres);
        return pres.getId();
    }

    //================================= MATCHING =====================================

    public Prescription matchDetails(Prescription pres){
        if(pres.getDetails()!=null){
            for (PrescriptionDetail detail: pres.getDetails()){
                detail.setPrescription(pres);
                matchDrug(detail);
            }
        }
        return  pres;
    }

    public void matchDrug(PrescriptionDetail detail){
        if (detail.getDrug()!=null) {
            if (detail.getDrug().getId() != 0) {
                Query query = sessionFactory.getCurrentSession().createQuery("from Drug where id=:id");
                query.setInteger("id", detail.getDrug().getId());
                if (query.uniqueResult() != null) {
                    detail.setDrug((Drug) query.uniqueResult());
                }
            }
        }
    }

    public Prescription matchICD(Prescription pres){
        if (pres.getDiagnosis()!=null) {
            if (pres.getDiagnosis().getId() != 0) {
                Query query = sessionFactory.getCurrentSession().createQuery("from Diagnosis where id=:id");
                query.setInteger("id",pres.getDiagnosis().getId());
                if (query.uniqueResult() != null) {
                    pres.setDiagnosis((Diagnosis) query.uniqueResult());
                }
            }
        }
        return pres;
    }
}
