package com.jadev.dscatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jadev.dscatalog.entities.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long>{

}
