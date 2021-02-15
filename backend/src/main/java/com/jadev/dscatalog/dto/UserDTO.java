package com.jadev.dscatalog.dto;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import com.jadev.dscatalog.entities.User;

public class UserDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	

	private Long id;
	
	@NotBlank(message ="Campo Obrigatorio")
	private String firstName;
	private String lastName;
	
	@Email(message="Favor entrar com email valido")
	private String email;
	
	public UserDTO() {
		
	}

	Set<RoleDTO> roles = new HashSet<>();
	
	public UserDTO(Long id, String firstName, String lastName, String email) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
	}
	
	public UserDTO(User entity) {
		id = entity.getId();
		firstName = entity.getEmail();
		lastName = entity.getEmail();
		email = entity.getEmail();
		entity.getRoles().forEach(role -> this.roles.add(new RoleDTO(role)));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Set<RoleDTO> getRoles() {
		return roles;
	}

	
	
	
}
