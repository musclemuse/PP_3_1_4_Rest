package ru.kata.spring.boot_security.demo.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

import java.util.List;

@Data
@NoArgsConstructor

@Entity
@Table(name = "roles")
public class Role implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;


    public Role(Long id, String name) {
        this.id = id;
        this.name = name;
    }


    @ManyToMany(mappedBy = "roles")
    @JsonIdentityInfo(
            generator = ObjectIdGenerators.PropertyGenerator.class,
            property = "id"
    )

    private List<User> users;

    @Override
    public String getAuthority() {
        return name;
    }

    @Override
    public String toString() {
        return name.replace("ROLE_", "");
    }
}