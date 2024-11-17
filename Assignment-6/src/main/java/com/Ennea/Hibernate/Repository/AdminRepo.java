package com.Ennea.Hibernate.Repository;

import com.Ennea.Hibernate.Entity.Admins;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepo extends JpaRepository<Admins,Integer> {
    Admins findByEmail(String email);
}

