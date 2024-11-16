package com.Ennea.Hibernate.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Admins {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column
    private int id;
    @Column
    private String name;
    @Column
    private String email;
    @Column
    private String Password;
    @Column
    private Date CreationDate;

}
