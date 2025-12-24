package com.GabrielST.BancoDigital.services;

import com.GabrielST.BancoDigital.domain.user.User;
import com.GabrielST.BancoDigital.domain.user.UserType;
import com.GabrielST.BancoDigital.dtos.userDTO;
import com.GabrielST.BancoDigital.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public void ValidateTransaction(User sender, BigDecimal amount) throws Exception {
        if(sender.getUserType() == UserType.MERCHANT) {
            throw new  Exception("Usuario do tipo LOJISTA não está permitido fazer transação!");
        }

        if(sender.getBalance().compareTo(amount) < 0) {
            throw new Exception("Saldo Insuficiente!");
        }
    }

        public User findUserById(Long id) throws Exception {

        return this.repository.findById(id).orElseThrow(() -> new Exception(""));
    }

    public User createUser(userDTO data) {
        User newUser = new User(data);
        this.saveUser(newUser);
        return newUser;
    }

    public void saveUser(User user) {
        this.repository.save(user);
    }

    public List<User> getAllUsers() {
        return this.repository.findAll();
    }
}
