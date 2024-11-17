<<<<<<< HEAD
package com.Ennea.Hibernate.Repository;

import com.Ennea.Hibernate.Entity.Students;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepo extends JpaRepository<Students,String> {
    Students findByrollno(String rollno);
}
=======
package com.Ennea.Hibernate.Repository;

import com.Ennea.Hibernate.Entity.Students;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepo extends JpaRepository<Students,String> {
    Students findByrollno(String rollno);
}
>>>>>>> 2204a1e9195f87fabd0d8f466e69ae3d031c1e55
