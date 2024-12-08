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
    private  String Category;
    @Column
    private String Description;
    @Column
    private Date CourseCreation;
    @Column(name="imageUrl",length = 1000000000)
    private String imageUrl;
    @Column(columnDefinition = "INT DEFAULT 0")
    private int Subscribed=0;
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<CoursesSubscribed> relatedEntities;

    public void clearRelationships() {
        if (relatedEntities != null) {
            relatedEntities.forEach(sub -> sub.setCourse(null));
            relatedEntities.clear();
        }
    }
}