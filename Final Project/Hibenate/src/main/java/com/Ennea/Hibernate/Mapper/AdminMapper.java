package com.Ennea.Hibernate.Mapper;

import com.Ennea.Hibernate.DTO.AdminDTO;
import com.Ennea.Hibernate.Entity.Admins;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface AdminMapper {

    AdminDTO toTeacherDTO(Admins admins);


    Admins toTeacherEntity(AdminDTO adminDTO);

    List<AdminDTO> toTeacherDtos(List<Admins> teachers);
}
