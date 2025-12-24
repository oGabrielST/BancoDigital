package com.GabrielST.BancoDigital.dtos;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record TransactionDTO(BigDecimal value, Long senderId, Long receiverId) {


}
