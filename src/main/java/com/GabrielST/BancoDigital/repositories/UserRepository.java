package com.GabrielST.BancoDigital.repositories;

import com.GabrielST.BancoDigital.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository {
    public interface UserRepositry extends JpaRepository<User, Long> {

        Optional<User> findByUsername(String document);

        Optional<User> findById(long id);
    }
}
