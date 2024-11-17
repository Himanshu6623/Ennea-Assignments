<<<<<<< HEAD
package com.Ennea.Hibernate.Entity;


import com.Ennea.Hibernate.Entity.Courses;
import com.Ennea.Hibernate.Entity.Students;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "courses_subscribed")
public class CoursesSubscribed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subscribedId")
    private int subscribedId;

    @ManyToOne
    @JoinColumn(name = "rollno")
    private Students student;

    @ManyToOne
    @JoinColumn(name = "courseId")
    private Courses course;

    private Date subscriptionDate = new Date();
}
=======
package com.Ennea.Hibernate.Entity;


import com.Ennea.Hibernate.Entity.Courses;
import com.Ennea.Hibernate.Entity.Students;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "courses_subscribed")
public class CoursesSubscribed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subscribedId")
    private int subscribedId;

    @ManyToOne
    @JoinColumn(name = "rollno")
    private Students student;

    @ManyToOne
    @JoinColumn(name = "courseId")
    private Courses course;

    private Date subscriptionDate = new Date();
}
>>>>>>> 2204a1e9195f87fabd0d8f466e69ae3d031c1e55
