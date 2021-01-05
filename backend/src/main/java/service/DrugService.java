package service;

import model.Drug;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class DrugService {
    @Autowired
    private SessionFactory sessionFactory;


    public Drug getDrug(int id){
        Query query = sessionFactory.getCurrentSession().createQuery("from Drug where id=:id");
        query.setInteger("id", id);
        return (Drug) query.uniqueResult();
    }

    public List<Drug> getAllDrug(){
        Query query = sessionFactory.getCurrentSession().createQuery("from Drug");
        return query.list();
    }

    public List<Drug> findDrug(String drugName){
        Query query = sessionFactory.getCurrentSession().createQuery("from Drug s where s.name like :name");
        query.setString("name", "%"+drugName+"%");
        return query.list();
    }

    public int addDrug(Drug drug){
        sessionFactory.getCurrentSession().saveOrUpdate(drug);
        return drug.getId();
    }

    public void deleteDrug(int id){
        Query query = sessionFactory.getCurrentSession().createQuery("from Drug where id=:id");
        query.setInteger("id", id);
        Drug drug = (Drug) query.uniqueResult();
        sessionFactory.getCurrentSession().delete(drug);
    }

    public int updateDrug(Drug drug){
        sessionFactory.getCurrentSession().saveOrUpdate(drug);
        return drug.getId();
    }
}
