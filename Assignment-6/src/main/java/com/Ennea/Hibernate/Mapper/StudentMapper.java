package com.Ennea.Hibernate.Mapper;
import com.Ennea.Hibernate.DTO.StudentsDTO;
import com.Ennea.Hibernate.Entity.Students;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;


@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)

public interface StudentMapper {
    StudentsDTO toStudentDTO(Students students);

    Students toStudentEntity(StudentsDTO studentsDTO);

    List<StudentsDTO> toStudentDtos(List<Students> students);

}
