package com.Ennea.Hibernate.Services.CourseServices;

import com.Ennea.Hibernate.Services.JWTService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ExtractUsername {

    public String rollNo="21311A6623";

    public void Username(String rollno)
    {
        rollNo=rollno;
    }
}
