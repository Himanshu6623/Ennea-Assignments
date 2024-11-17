<<<<<<< HEAD
package com.Ennea.Hibernate.Repository;

import com.Ennea.Hibernate.Entity.Admins;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepo extends JpaRepository<Admins,Integer> {
    Admins findByEmail(String email);
}
=======
package com.Ennea.Hibernate.Repository;

import com.Ennea.Hibernate.Entity.Admins;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepo extends JpaRepository<Admins,Integer> {
    Admins findByEmail(String email);
}
>>>>>>> 2204a1e9195f87fabd0d8f466e69ae3d031c1e55
