package service;

import model.Disease;
import model.Drug;
import model.MedicalService;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ImportService {
    @Autowired
    private SessionFactory sessionFactory;

    public List<Disease> getICDs() {
        return this.sessionFactory.getCurrentSession().createQuery("from Disease").list();
    }

    public List<Drug> getAllDrugs() {
        return this.sessionFactory.getCurrentSession().createQuery("from Drug").list();
    }
    
    public List<MedicalService> getMedicalServices() {
        return this.sessionFactory.getCurrentSession().createQuery("from MedicalService").list();
    }
    
    public Disease getICD(int id) {
        return (Disease) this.sessionFactory.getCurrentSession().get(Disease.class, id);
    }

    public Drug getDrug(int id) {
        return (Drug)this.sessionFactory.getCurrentSession().get(Drug.class, id);
    }

    public MedicalService getMedicalService(int id) {
        return (MedicalService) this.sessionFactory.getCurrentSession().get(MedicalService.class, id);
    }
}
