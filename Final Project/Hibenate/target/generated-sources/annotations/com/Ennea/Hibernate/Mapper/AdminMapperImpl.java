package com.Ennea.Hibernate.Mapper;

import com.Ennea.Hibernate.DTO.AdminDTO;
import com.Ennea.Hibernate.Entity.Admins;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-01T21:10:52+0530",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.5 (Amazon.com Inc.)"
)
@Component
public class AdminMapperImpl implements AdminMapper {

    @Override
    public AdminDTO toTeacherDTO(Admins admins) {
        if ( admins == null ) {
            return null;
        }

        AdminDTO adminDTO = new AdminDTO();

        adminDTO.setId( admins.getId() );
        adminDTO.setName( admins.getName() );
        adminDTO.setEmail( admins.getEmail() );
        adminDTO.setImageUrl( admins.getImageUrl() );

        return adminDTO;
    }

    @Override
    public Admins toTeacherEntity(AdminDTO adminDTO) {
        if ( adminDTO == null ) {
            return null;
        }

        Admins admins = new Admins();

        admins.setId( adminDTO.getId() );
        admins.setName( adminDTO.getName() );
        admins.setEmail( adminDTO.getEmail() );
        admins.setImageUrl( adminDTO.getImageUrl() );

        return admins;
    }

    @Override
    public List<AdminDTO> toTeacherDtos(List<Admins> teachers) {
        if ( teachers == null ) {
            return null;
        }

        List<AdminDTO> list = new ArrayList<AdminDTO>( teachers.size() );
        for ( Admins admins : teachers ) {
            list.add( toTeacherDTO( admins ) );
        }

        return list;
    }
}
