<<<<<<< HEAD
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
public class Courses {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column(name="course_id")
    private int courseId;
    @Column(name="title")
    private String Title;
    @Column
    private String Description;
    @Column
    private Date CourseCreation;
    @Column(name="imageUrl")
    private String imageUrl;
    @Column(columnDefinition = "INT DEFAULT 0")
    private int Subscribed=0;
=======
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
public class Courses {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column
    private int CourseId;
    @Column(name="title")
    private String Title;
    @Column
    private String Description;
    @Column
    private Date CourseCreation;
    @Column(name="imageUrl")
    private String imageUrl;
    @Column(columnDefinition = "INT DEFAULT 0")
    private int Subscribed=0;
>>>>>>> 2204a1e9195f87fabd0d8f466e69ae3d031c1e55
}