package com.jadev.dscatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jadev.dscatalog.entities.Product;
import com.jadev.dscatalog.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{

}
