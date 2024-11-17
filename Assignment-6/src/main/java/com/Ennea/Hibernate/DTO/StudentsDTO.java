package com.Ennea.Hibernate.DTO;

import com.Ennea.Hibernate.Entity.Courses;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentsDTO {

    private String rollno;

    private String name;

}
