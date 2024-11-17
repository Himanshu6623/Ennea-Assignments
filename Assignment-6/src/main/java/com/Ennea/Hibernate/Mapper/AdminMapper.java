<<<<<<< HEAD
package com.Ennea.Hibernate.Mapper;

import com.Ennea.Hibernate.DTO.AdminDTO;
import com.Ennea.Hibernate.Entity.Admins;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface AdminMapper {
    @Mapping(target = "name", source = "name")
    @Mapping(target = "email", source = "email")
    AdminDTO toTeacherDTO(Admins admins);

    @Mapping(target = "name", source = "name")
    @Mapping(target = "email", source = "email")
    Admins toTeacherEntity(AdminDTO adminDTO);

    List<AdminDTO> toTeacherDtos(List<Admins> teachers);
}
=======
package com.Ennea.Hibernate.Mapper;

import com.Ennea.Hibernate.DTO.AdminDTO;
import com.Ennea.Hibernate.Entity.Admins;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface AdminMapper {
    @Mapping(target = "name", source = "name")
    @Mapping(target = "email", source = "email")
    AdminDTO toTeacherDTO(Admins admins);

    @Mapping(target = "name", source = "name")
    @Mapping(target = "email", source = "email")
    Admins toTeacherEntity(AdminDTO adminDTO);

    List<AdminDTO> toTeacherDtos(List<Admins> teachers);
    List<Admins> toTeacherEntities(List<AdminDTO> adminDTO);
}
>>>>>>> 2204a1e9195f87fabd0d8f466e69ae3d031c1e55
