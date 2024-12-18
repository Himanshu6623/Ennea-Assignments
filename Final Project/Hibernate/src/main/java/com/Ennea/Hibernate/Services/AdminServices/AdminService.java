package com.Ennea.Hibernate.Services.AdminServices;

import com.Ennea.Hibernate.DTO.AdminDTO;
import com.Ennea.Hibernate.Entity.Admins;
import com.Ennea.Hibernate.Entity.Students;
import com.Ennea.Hibernate.Mapper.AdminMapper;
import com.Ennea.Hibernate.Repository.AdminRepo;
import com.Ennea.Hibernate.Services.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private AdminMapper adminMapper;

    @Autowired
    private JWTService jwt;

    @Autowired
    private AuthenticationManager authenticationManager;

    public List<AdminDTO> getallAdminDTO(){
        List<Admins> users= adminRepo.findAll();
        return adminMapper.toTeacherDtos(users);
    }

    public List<Admins> getAllAdmin(){
        List<Admins> admins=adminRepo.findAll();
        return admins;
    }

    public AdminDTO AddUser(AdminDTO adminDTO)
    {
        Admins user=adminMapper.toTeacherEntity(adminDTO);
        Admins userResponse= adminRepo.save(user);
        AdminDTO response=adminMapper.toTeacherDTO(userResponse);
        return response;
    }

    public ResponseEntity<String> verify(Admins admins) {
        try
        {
            Authentication authentication =
                    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                            admins.getId(),
                            admins.getPassword())
                    );

            if (authentication.isAuthenticated()) {
                return ResponseEntity.ok(jwt.getToken(admins.getId()));
            }
        }
        catch (AuthenticationException ex) {
            System.out.println("Authentication failed: " + ex.getMessage());
            return new ResponseEntity<>("User not found or invalid credentials", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
