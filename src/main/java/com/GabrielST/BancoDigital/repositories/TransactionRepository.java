package com.GabrielST.BancoDigital.repositories;

import com.GabrielST.BancoDigital.domain.user.transaction.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends  JpaRepository<Transaction, Long>
{
}
