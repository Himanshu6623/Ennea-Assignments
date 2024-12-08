package com.Ennea.Hibernate.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseDTO {

    private int courseId;

    private String Title;

    private String Category;

    private String Description;

    private String imageUrl;
}
