package com.Ennea.Hibernate.Services.StudentServices;

import com.Ennea.Hibernate.DTO.StudentsDTO;
import com.Ennea.Hibernate.Entity.Courses;
import com.Ennea.Hibernate.Mapper.StudentMapper;
import com.Ennea.Hibernate.Entity.Students;
import com.Ennea.Hibernate.Repository.StudentRepo;
import com.Ennea.Hibernate.Services.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private StudentMapper studentMapper;

    @Autowired
    private JWTService jwt;

    @Autowired
    private AuthenticationManager authenticationManager;

    public List<StudentsDTO> getAllStudentsDTO() {
        List<Students> users = studentRepo.findAll();
        return studentMapper.toStudentDtos(users);
    }

    public List<Students> getAllStudents(){
        List<Students> students=studentRepo.findAll();
        return students;
    }

    public StudentsDTO AddUser(StudentsDTO studentsDTO) {
        Students user = studentMapper.toStudentEntity(studentsDTO);
        Students userResponse = studentRepo.save(user);
        StudentsDTO response = studentMapper.toStudentDTO(userResponse);
        return response;
    }

    public ResponseEntity<String> verify(Students students) {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            students.getRollno(),
                            students.getPassword()
                    )
            );
            if (authentication.isAuthenticated()) {
                String token = jwt.getToken(students.getRollno());
                return ResponseEntity.ok(token);
            }

        throw new RuntimeException("Unexpected Authentication Error");
    }


}