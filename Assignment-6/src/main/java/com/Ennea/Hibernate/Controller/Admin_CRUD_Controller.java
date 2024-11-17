package com.Ennea.Hibernate.Controller;

import com.Ennea.Hibernate.DTO.AdminDTO;
import com.Ennea.Hibernate.Entity.Admins;
import com.Ennea.Hibernate.Entity.Students;
import com.Ennea.Hibernate.Services.AdminServices.AdminService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/Admin")
public class Admin_CRUD_Controller {
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private AdminService adminService;

    private BCryptPasswordEncoder encoder =new BCryptPasswordEncoder(12);

    @PostMapping("/register")
    @Transactional
    public String Register(@RequestBody Admins teacher)
    {
        teacher.setCreationDate(new Date(System.currentTimeMillis()));
        teacher.setPassword(encoder.encode(teacher.getPassword()));
        try{
            entityManager.persist(teacher);
            return "Successful";
        }
        catch(Exception e)
        {
            return "Failed";
        }
    }

    @PostMapping("/login")
    public String Login(@RequestBody Admins admins)
    {
        return adminService.verify(admins);
    }

    @GetMapping
    @Transactional
    public List<AdminDTO> getTeacher(){
        return adminService.getallusers();
    }

    @PutMapping("/UpdateId")
    @Transactional
    public String Update(@RequestBody Admins teacher)
    {
        try{
            entityManager.merge(teacher);
            return "Successful";
        }
        catch(Exception e)
        {
            return "Failed";
        }
    }
}
