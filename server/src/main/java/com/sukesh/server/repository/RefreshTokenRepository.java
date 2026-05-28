package com.sukesh.server.repository;

import com.sukesh.server.entity.RefreshToken;
import com.sukesh.server.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
  Optional<RefreshToken> findByHashedToken(String hashedToken);

  void deleteByUser(User user);

  void deleteByHashedToken(String hashedToken);
}
