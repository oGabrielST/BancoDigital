package com.GabrielST.BancoDigital.services;

import com.GabrielST.BancoDigital.domain.user.transaction.Transaction;
import com.GabrielST.BancoDigital.domain.user.User;
import com.GabrielST.BancoDigital.dtos.TransactionDTO;
import com.GabrielST.BancoDigital.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class TransactionService {

    @Autowired
    private UserService userService;

    @Autowired
    private TransactionRepository repository;

    @Transactional
    public Transaction createTransaction(TransactionDTO transaction) throws Exception {

        User sender = User.userService.findUserById(transaction.senderId());
        User receiver = User.userService.findUserById(transaction.receiverId());


        userService.validateTransaction(sender, transaction.value());

        sender.setBalance(sender.getBalance().subtract(transaction.value()));
        receiver.setBalance(receiver.getBalance().add(transaction.value()));

        this.userService.saveUser(sender);
        this.userService.saveUser(receiver);

        Transaction newTransaction = new Transaction();
        newTransaction.setAmount(transaction.value());
        newTransaction.setSender(sender);
        newTransaction.setReceiver(receiver);
        newTransaction.setTimestamp(LocalDateTime.now());


        return this.repository.save(newTransaction);
    }
}
