package com.Ennea.Hibernate.Services.AdminServices;

import com.Ennea.Hibernate.Entity.Admins;
import com.Ennea.Hibernate.Model_Details.MyAdminDetails;
import com.Ennea.Hibernate.Repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class myAdminDetailService implements UserDetailsService {
    @Autowired
    private AdminRepo repo;

    @Override
    public UserDetails loadUserByUsername(String Id) throws UsernameNotFoundException {
        Admins teacher=repo.findById(Id);
        if(teacher==null)
        {
            System.out.println("User not found");
            throw new UsernameNotFoundException("USER NOT FOUND");
        }
        return new MyAdminDetails(teacher);
    }
}
