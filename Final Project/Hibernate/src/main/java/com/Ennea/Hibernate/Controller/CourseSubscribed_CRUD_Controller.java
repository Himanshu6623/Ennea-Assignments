package com.Ennea.Hibernate.Controller;

import com.Ennea.Hibernate.Entity.Courses;
import com.Ennea.Hibernate.Entity.CoursesSubscribed;
import com.Ennea.Hibernate.Entity.Students;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/CourseStatus")
public class CourseSubscribed_CRUD_Controller {

    @PersistenceContext
    private EntityManager entityManager;


    @PutMapping("/subscribe")
    @Transactional
    @PreAuthorize("hasAuthority('STUDENT')")
    public ResponseEntity<String> subscribeCourse(@RequestBody CoursesSubscribed coursesSubscribed) {
        Courses course = entityManager.find(Courses.class, coursesSubscribed.getCourse().getCourseId());

        if (course == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found.");
        }

        Students student = entityManager.find(Students.class, coursesSubscribed.getStudent().getRollno());

        if (student == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found.");
        }

        course.setSubscribed(course.getSubscribed() + 1);
        entityManager.merge(course);

        coursesSubscribed.setStudent(student);
        coursesSubscribed.setCourse(course);
        entityManager.persist(coursesSubscribed);

        return ResponseEntity.ok("Student successfully subscribed to the course.");
    }


    @PutMapping("/unsubscribe")
    @Transactional
    @PreAuthorize("hasAuthority('STUDENT')")
    public ResponseEntity<String> unsubscribeCourse(@RequestBody CoursesSubscribed coursesSubscribed) {
        Courses course = entityManager.find(Courses.class, coursesSubscribed.getCourse().getCourseId());

        if (course == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found.");
        }

        Students student = entityManager.find(Students.class, coursesSubscribed.getStudent().getRollno());

        if (student == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found.");
        }

        CoursesSubscribed existingSubscription = entityManager
                .createQuery("SELECT cs FROM CoursesSubscribed cs WHERE cs.course.courseId = :courseId AND cs.student.rollno = :rollno", CoursesSubscribed.class)
                .setParameter("courseId", coursesSubscribed.getCourse().getCourseId())
                .setParameter("rollno", coursesSubscribed.getStudent().getRollno())
                .getResultStream()
                .findFirst()
                .orElse(null);

        if (existingSubscription == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Subscription not found.");
        }

        if (course.getSubscribed() > 0) {
            course.setSubscribed(course.getSubscribed() - 1);
            entityManager.merge(course);

            entityManager.remove(existingSubscription);

            return ResponseEntity.ok("Student successfully unsubscribed from the course.");
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Course subscription count is invalid or already at zero.");
    }
}
