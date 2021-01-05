package service;

import model.UserRole;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserService {

    @Autowired
    private SessionFactory sessionFactory;

    public List<UserRole> getUserRoleByUser(String username){
        Query query = sessionFactory.getCurrentSession().createQuery("from UserRole where user.name=:username");
        query.setString("username", username);
        return query.list();
    }


}
