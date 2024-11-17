<<<<<<< HEAD
package com.Ennea.Hibernate.Services.StudentServices;

import com.Ennea.Hibernate.Model_Details.MyStudentDetails;
import com.Ennea.Hibernate.Entity.Students;
import com.Ennea.Hibernate.Repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

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
            throw new UsernameNotFoundException("User Not Found");
        }

        return new MyStudentDetails(student);
    }
}
=======
package com.Ennea.Hibernate.Services.StudentServices;

import com.Ennea.Hibernate.Model_Details.MyStudentDetails;
import com.Ennea.Hibernate.Entity.Students;
import com.Ennea.Hibernate.Repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

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
            throw new UsernameNotFoundException("User Not Found");
        }

        return new MyStudentDetails(student);
    }
}
>>>>>>> 2204a1e9195f87fabd0d8f466e69ae3d031c1e55
