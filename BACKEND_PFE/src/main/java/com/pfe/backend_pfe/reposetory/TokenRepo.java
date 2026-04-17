package com.pfe.backend_pfe.reposetory;

import com.pfe.backend_pfe.Entities.Token;
import com.pfe.backend_pfe.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepo extends JpaRepository<Token, Long> {
    Token findByToken(String token);

    Token findByUser(User user);
}
