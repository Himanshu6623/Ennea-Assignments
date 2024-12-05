package com.Ennea.Hibernate.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Students {
    @Id
    @Column(name="rollno")
    private String rollno;
    @Column
    private String name;
    @Column
    private String Password;
    @Column
    private Date CreationDate;
    @Column(name="imageUrl",length = 1000000000)
    private String imageUrl;
    private String email;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<CoursesSubscribed> relatedEntities;

    public void clearRelationships() {
        if (relatedEntities != null) {
            relatedEntities.forEach(sub -> sub.setStudent(null));
            relatedEntities.clear();
        }
    }
}
