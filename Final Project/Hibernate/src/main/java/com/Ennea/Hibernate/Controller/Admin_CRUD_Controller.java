package com.Ennea.Hibernate.Controller;

import com.Ennea.Hibernate.DTO.*;
import com.Ennea.Hibernate.Entity.Admins;
import com.Ennea.Hibernate.Entity.Students;
import com.Ennea.Hibernate.Services.AdminServices.AdminService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> Register(@RequestBody Admins teacher)
    {
        List<AdminDTO> adminDTOList = adminService.getallAdminDTO();

        AdminDTO admin = adminDTOList.stream()
                .filter(s -> teacher.getId().equals(s.getId()))
                .findFirst()
                .orElse(null);
        if(admin!=null)
        {
            return new ResponseEntity<>(HttpStatus.FOUND);
        }
        teacher.setCreationDate(new Date(System.currentTimeMillis()));
        teacher.setPassword(encoder.encode(teacher.getPassword()));
        try{
            entityManager.persist(teacher);
            return ResponseEntity.ok("Password updated successfully.");
        }
        catch(Exception e)
        {
            return ResponseEntity.ok("Failed to register");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> Login(@RequestBody Admins admin)
    {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        List<Admins> admins = adminService.getAllAdmin();

        Admins adminId = admins.stream()
                .filter(s -> admin.getId().equals(s.getId()))
                .findFirst()
                .orElse(null);

        if(adminId!=null)
        {
            if(!passwordEncoder.matches( admin.getPassword(),adminId.getPassword()))
            {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        if(adminId==null)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return adminService.verify(admin);
    }

    @GetMapping
    @Transactional
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<AdminDTO> getTeacher(){
        return adminService.getallAdminDTO();
    }

    @GetMapping("/AdminId/{Id}")
    @Transactional
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<AdminDTO> GetStudentById(@PathVariable String Id)
    {
        List<AdminDTO> adminDTOList = adminService.getallAdminDTO();

        AdminDTO admin = adminDTOList.stream()
                .filter(s -> Id.equals(s.getId()))
                .findFirst()
                .orElse(null);

        if (admin == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(admin, HttpStatus.OK);
    }

    @PutMapping("/UpdateAdminPassword")
    @Transactional
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> updateAdminPasswordById(@RequestBody UpdateAdminPasswordDTO request) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        try {
            Admins admin = entityManager.getReference(Admins.class, request.getId());

            if (passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
                String encodedNewPassword = passwordEncoder.encode(request.getNewPassword());
                admin.setPassword(encodedNewPassword);
                entityManager.merge(admin);
                return ResponseEntity.ok("Password updated successfully.");
            } else {
                throw new IllegalArgumentException("Incorrect password.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
        }
    }

    @PutMapping("/StudentPasswordChange")
    @Transactional
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> changeStudentPassword(@RequestBody AdminChangeStudentPasswordDTO request)
    {
        BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
        try{
            Students student=entityManager.getReference(Students.class,request.getRollno());
            String encodedNewPassword = passwordEncoder.encode(request.getPassword());
            student.setPassword(encodedNewPassword);
            entityManager.merge(student);
            return ResponseEntity.ok("Password updated successfully.");
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
        }
    }

    @PutMapping("/UpdateAdmin")
    @Transactional
    @PreAuthorize("hasAuthority('ADMIN')")
    public void UpdateStudentById(@RequestBody Admins admin)
    {
        try{
            Admins admins=entityManager.getReference(Admins.class,admin.getId());
            admins.setName(admin.getName());

            admins.setEmail(admin.getEmail());

            admins.setImageUrl(admin.getImageUrl());

            entityManager.merge(admins);
        }
        catch (Exception e)
        {
            System.out.println("INVALID ID");
        }
    }
}
