package com.Ennea.Hibernate.Repository;

import com.Ennea.Hibernate.Entity.Courses;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepo extends JpaRepository<Courses,Integer> {
}
