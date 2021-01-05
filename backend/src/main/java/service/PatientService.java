package service;

import java.util.List;
import javax.transaction.Transactional;
import model.Patient;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PatientService {
    @Autowired
    private SessionFactory sessionFactory;

    public PatientService() {
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public Patient addPatient(Patient patient) {
        this.sessionFactory.getCurrentSession().save(patient);
        return patient;
    }

    public List<Patient> getAllPatients() {
        return this.sessionFactory.getCurrentSession().createQuery("from Patient").list();
    }

    public Patient getPatient(int id) {
        return (Patient)this.sessionFactory.getCurrentSession().get(Patient.class, id);
    }

    public void deletePatient(int id) {
        Patient patient = this.getPatient(id);
        this.sessionFactory.getCurrentSession().delete(patient);
    }

    public void updatePatient(Patient patient) {
        this.sessionFactory.getCurrentSession().update(patient);
    }

    public List<Patient> getPatientsByName(String name) {
        Query query = this.sessionFactory.getCurrentSession().createQuery("from Patient where name LIKE :name");
        String var = '%'+name+"%";
        query.setString("name", var);
        return query.list();
    }

    public List<Patient> getPatientsByDob(String date) {
        Query query = this.sessionFactory.getCurrentSession().createQuery("from Patient where dateOfBirth = :date");
        query.setString("date", date);
        return query.list();
    }
}
