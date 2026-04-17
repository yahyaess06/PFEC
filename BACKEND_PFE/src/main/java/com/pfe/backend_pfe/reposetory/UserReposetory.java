package com.pfe.backend_pfe.reposetory;


import com.pfe.backend_pfe.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserReposetory extends JpaRepository<User, String> {
User findUserByEmail(String email);

}
