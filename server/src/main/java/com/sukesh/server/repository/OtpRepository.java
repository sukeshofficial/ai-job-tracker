package com.sukesh.server.repository;

import com.sukesh.server.entity.Otp;
import com.sukesh.server.entity.OtpPurpose;
import com.sukesh.server.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface OtpRepository extends JpaRepository<Otp, UUID> {
  Optional<Otp> findByUserAndPurposeAndIsUsedFalse(User user, OtpPurpose purpose);

  void deleteByUser(User user);
}
