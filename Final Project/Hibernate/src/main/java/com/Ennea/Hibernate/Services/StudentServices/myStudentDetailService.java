package com.Ennea.Hibernate.Services.StudentServices;

import com.Ennea.Hibernate.Model_Details.MyStudentDetails;
import com.Ennea.Hibernate.Entity.Students;
import com.Ennea.Hibernate.Repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class myStudentDetailService implements UserDetailsService {
    @Autowired
    private StudentRepo repo;

    @Override
    public UserDetails loadUserByUsername(String rollNo) throws UsernameNotFoundException {
        Students student=repo.findByrollno(rollNo);

        if(student==null)
        {
            System.out.println("User not found");
            throw new UsernameNotFoundException("USER NOT FOUND");

        }
        return new MyStudentDetails(student);
    }
}
