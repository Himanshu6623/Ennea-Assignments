package com.Ennea.Hibernate.Mapper;

import com.Ennea.Hibernate.DTO.AdminDTO;
import com.Ennea.Hibernate.DTO.CourseDTO;
import com.Ennea.Hibernate.Entity.Admins;
import com.Ennea.Hibernate.Entity.Courses;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel=MappingConstants.ComponentModel.SPRING)
public interface CourseMapper {
    CourseDTO toCourseDTO(Courses courses);

    Courses toCourseEntity(CourseDTO courseDTO);

    List<CourseDTO> toCourseDtos(List<Courses> courses);
}
