package com.Ennea.Hibernate.Mapper;

import com.Ennea.Hibernate.DTO.CourseDTO;
import com.Ennea.Hibernate.Entity.Courses;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-11-26T06:46:10+0530",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.5 (Amazon.com Inc.)"
)
@Component
public class CourseMapperImpl implements CourseMapper {

    @Override
    public CourseDTO toCourseDTO(Courses courses) {
        if ( courses == null ) {
            return null;
        }

        CourseDTO courseDTO = new CourseDTO();

        courseDTO.setCourseId( courses.getCourseId() );
        courseDTO.setTitle( courses.getTitle() );
        courseDTO.setCategory( courses.getCategory() );
        courseDTO.setDescription( courses.getDescription() );
        courseDTO.setImageUrl( courses.getImageUrl() );

        return courseDTO;
    }

    @Override
    public Courses toCourseEntity(CourseDTO courseDTO) {
        if ( courseDTO == null ) {
            return null;
        }

        Courses courses = new Courses();

        courses.setCourseId( courseDTO.getCourseId() );
        courses.setTitle( courseDTO.getTitle() );
        courses.setCategory( courseDTO.getCategory() );
        courses.setDescription( courseDTO.getDescription() );
        courses.setImageUrl( courseDTO.getImageUrl() );

        return courses;
    }

    @Override
    public List<CourseDTO> toCourseDtos(List<Courses> courses) {
        if ( courses == null ) {
            return null;
        }

        List<CourseDTO> list = new ArrayList<CourseDTO>( courses.size() );
        for ( Courses courses1 : courses ) {
            list.add( toCourseDTO( courses1 ) );
        }

        return list;
    }
}
