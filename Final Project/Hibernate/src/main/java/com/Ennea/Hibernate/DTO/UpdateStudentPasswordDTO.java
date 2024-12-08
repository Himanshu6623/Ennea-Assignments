package com.Ennea.Hibernate.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateStudentPasswordDTO {

    private String rollno;

    private String Password;

    private String newPassword;
}
