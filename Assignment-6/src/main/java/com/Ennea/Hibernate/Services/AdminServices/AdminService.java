package com.Ennea.Hibernate.Services.AdminServices;

import com.Ennea.Hibernate.DTO.AdminDTO;
import com.Ennea.Hibernate.Entity.Admins;
import com.Ennea.Hibernate.Entity.Students;
import com.Ennea.Hibernate.Mapper.AdminMapper;
import com.Ennea.Hibernate.Repository.AdminRepo;
import com.Ennea.Hibernate.Services.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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

    public List<AdminDTO> getallusers(){
        List<Admins> users= adminRepo.findAll();
        return adminMapper.toTeacherDtos(users);
    }

    public AdminDTO AddUser(AdminDTO adminDTO)
    {
        Admins user=adminMapper.toTeacherEntity(adminDTO);
        Admins userResponse= adminRepo.save(user);
        AdminDTO response=adminMapper.toTeacherDTO(userResponse);
        return response;
    }

    public String verify(Admins admins) {
        Authentication authentication =
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(admins.getEmail(), admins.getPassword()));

        if (authentication.isAuthenticated()) {
            return jwt.getToken(admins.getEmail());
        }

        return "Invalid Username or Password";
    }
}
