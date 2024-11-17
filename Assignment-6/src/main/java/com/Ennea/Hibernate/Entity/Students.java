package com.Ennea.Hibernate.Entity;

import io.micrometer.observation.Observation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.*;

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

}
