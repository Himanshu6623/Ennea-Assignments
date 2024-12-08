package com.Ennea.Hibernate.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentsDTO {

    private String rollno;

    private String name;

    private String imageUrl;

    private String email;
}
