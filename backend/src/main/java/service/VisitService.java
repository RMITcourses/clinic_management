package service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.transaction.Transactional;

import model.*;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class VisitService {
    @Autowired
    private SessionFactory sessionFactory;

    public VisitService() {
    }

    public Visit addVisit(Visit visit) {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        DateFormat tf = new SimpleDateFormat("HH:mm:ss");
        Date dateObj = new Date();
        visit.setDate(df.format(dateObj));
        visit.setTime(tf.format(dateObj));
        visit.setCheckedOut(false);
        this.sessionFactory.getCurrentSession().save(visit);
        return visit;
    }

    public List<Visit> getAllVisits() {
        return this.sessionFactory.getCurrentSession().createQuery("from Visit").list();
    }

    public List<Visit> getCurrentVisits() {
        return this.sessionFactory.getCurrentSession().createQuery("from Visit where checkedOut = false").list();
    }

    public Visit getVisit(int id) {
        return (Visit)this.sessionFactory.getCurrentSession().get(Visit.class, id);
    }

    public void deleteVisit(int id) {
        Visit visit = this.getVisit(id);
        this.sessionFactory.getCurrentSession().delete(visit);
    }

    public void updateVisit(Visit visit) {
        this.sessionFactory.getCurrentSession().update(visit);
    }

    public void checkout(int id) {
        Visit visit = this.getVisit(id);
        visit.setCheckedOut(true);
        this.sessionFactory.getCurrentSession().update(visit);
    }

    public List<Visit> getVisits(String date) {
        Query query = this.sessionFactory.getCurrentSession().createQuery("from Visit where date = :date");
        query.setString("date", date);
        return query.list();
    }

    public List<Visit> getVisits(int patientId) {
        Query query = this.sessionFactory.getCurrentSession().createQuery("from Visit where patient_id = :patientId");
        query.setInteger("patientId", patientId);
        return query.list();
    }


}
