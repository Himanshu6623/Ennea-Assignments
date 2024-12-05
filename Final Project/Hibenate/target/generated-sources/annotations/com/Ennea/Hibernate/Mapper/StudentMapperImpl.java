package com.Ennea.Hibernate.Mapper;

import com.Ennea.Hibernate.DTO.StudentsDTO;
import com.Ennea.Hibernate.Entity.Students;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-11-26T06:46:11+0530",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.5 (Amazon.com Inc.)"
)
@Component
public class StudentMapperImpl implements StudentMapper {

    @Override
    public StudentsDTO toStudentDTO(Students students) {
        if ( students == null ) {
            return null;
        }

        StudentsDTO studentsDTO = new StudentsDTO();

        studentsDTO.setRollno( students.getRollno() );
        studentsDTO.setName( students.getName() );
        studentsDTO.setImageUrl( students.getImageUrl() );
        studentsDTO.setEmail( students.getEmail() );

        return studentsDTO;
    }

    @Override
    public Students toStudentEntity(StudentsDTO studentsDTO) {
        if ( studentsDTO == null ) {
            return null;
        }

        Students students = new Students();

        students.setRollno( studentsDTO.getRollno() );
        students.setName( studentsDTO.getName() );
        students.setImageUrl( studentsDTO.getImageUrl() );
        students.setEmail( studentsDTO.getEmail() );

        return students;
    }

    @Override
    public List<StudentsDTO> toStudentDtos(List<Students> students) {
        if ( students == null ) {
            return null;
        }

        List<StudentsDTO> list = new ArrayList<StudentsDTO>( students.size() );
        for ( Students students1 : students ) {
            list.add( toStudentDTO( students1 ) );
        }

        return list;
    }
}