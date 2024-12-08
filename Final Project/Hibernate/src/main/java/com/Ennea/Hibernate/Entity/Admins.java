package com.Ennea.Hibernate.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
    @Column
    private String id;

    @Column
    private String name;

    @Column
    private String email;

    @Column
    private String Password;

    @Column
    private Date CreationDate;

    @Column(name="imageUrl",length = 1000000000)
    private String imageUrl;
}
