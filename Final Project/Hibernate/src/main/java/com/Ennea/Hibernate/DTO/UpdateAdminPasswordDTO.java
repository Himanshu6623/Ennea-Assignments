package com.Ennea.Hibernate.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateAdminPasswordDTO {

    private String id;

    private String Password;

    private String newPassword;
}
