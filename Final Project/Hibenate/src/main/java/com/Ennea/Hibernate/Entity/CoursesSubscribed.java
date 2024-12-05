package com.Ennea.Hibernate.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;
import java.util.Objects;

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

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "rollno", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Students student;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "courseId", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Courses course;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date subscriptionDate = new Date();

    public CoursesSubscribed(Students student, Courses course) {
        this.student = student;
        this.course = course;
        this.subscriptionDate = new Date();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CoursesSubscribed that = (CoursesSubscribed) o;
        return subscribedId == that.subscribedId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(subscribedId);
    }
}
