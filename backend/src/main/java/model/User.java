package model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence-generator")
    @SequenceGenerator(name = "sequence-generator", sequenceName = "user_sequence", allocationSize = 1)
    private int id;

    @Column
    private String name;

    @Column
    private String password;

    @OneToMany(mappedBy = "user")
    private List<UserRole> userroles;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<UserRole> getUserroles() {
        return userroles;
    }

    public void setUserroles(List<UserRole> userroles) {
        this.userroles = userroles;
    }
}
