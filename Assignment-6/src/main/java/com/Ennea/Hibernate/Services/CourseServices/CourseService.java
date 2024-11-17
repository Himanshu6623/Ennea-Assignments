package com.Ennea.Hibernate.Services.CourseServices;

import com.Ennea.Hibernate.DTO.CourseDTO;
import com.Ennea.Hibernate.Entity.Courses;
import com.Ennea.Hibernate.Mapper.CourseMapper;
import com.Ennea.Hibernate.Repository.CourseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    @Autowired
    private CourseRepo courseRepo;

    @Autowired
    private CourseMapper courseMapper;

    public List<CourseDTO> getAllCoursesDTO() {
        List<Courses> courses = courseRepo.findAll();
        return courseMapper.toCourseDtos(courses);
    }

    public List<Courses> getAllCourses(){
        List<Courses> courses=courseRepo.findAll();
        return courses;
    }
}
