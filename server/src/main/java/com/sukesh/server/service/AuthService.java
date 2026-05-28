package com.sukesh.server.service;

import com.sukesh.server.dto.AuthResponse;
import com.sukesh.server.dto.LoginRequest;
import com.sukesh.server.dto.SignupRequest;
import com.sukesh.server.dto.UserDTO;
import com.sukesh.server.entity.RefreshToken;
import com.sukesh.server.entity.User;
import com.sukesh.server.repository.RefreshTokenRepository;
import com.sukesh.server.repository.UserRepository;
import com.sukesh.server.security.JwtUtils;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

  private final UserRepository userRepository;
  private final RefreshTokenRepository refreshTokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtUtils jwtUtils;

  @Value("${jwt.cookie-name}")
  private String jwtCookieName;

  @Value("${jwt.refresh-cookie-name}")
  private String refreshCookieName;

  @Value("${jwt.refresh-expiration-ms}")
  private long refreshExpirationMs;

  @Transactional
  public AuthResponse signup(SignupRequest request, HttpServletResponse response) {
    if (userRepository.existsByEmail(request.getEmail())) {
      throw new RuntimeException("Email already in use");
    }
    if (userRepository.existsByUsername(request.getUsername())) {
      throw new RuntimeException("Username already in use");
    }

    User user = User.builder()
        .firstName(request.getFirstName())
        .lastName(request.getLastName())
        .username(request.getUsername().toLowerCase())
        .email(request.getEmail().toLowerCase())
        .password(passwordEncoder.encode(request.getPassword()))
        .providers(Set.of("local"))
        .isVerified(false)
        .tokenVersion(0)
        .build();

    user = userRepository.save(user);

    setTokens(user, response);

    return AuthResponse.builder()
        .message("User registered successfully")
        .user(mapToDTO(user))
        .build();
  }

  @Transactional
  public AuthResponse login(LoginRequest request, HttpServletResponse response) {
    User user = userRepository.findByEmail(request.getLogin().toLowerCase())
        .or(() -> userRepository.findByUsername(request.getLogin().toLowerCase()))
        .orElseThrow(() -> new RuntimeException("User not found"));

    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
      throw new RuntimeException("Invalid credentials");
    }

    setTokens(user, response);

    return AuthResponse.builder()
        .message("Login successful")
        .user(mapToDTO(user))
        .build();
  }

  public void logout(User user, HttpServletResponse response) {
    user.setTokenVersion(user.getTokenVersion() + 1);
    userRepository.save(user);
    refreshTokenRepository.deleteByUser(user);

    ResponseCookie cookie = ResponseCookie.from(jwtCookieName, "")
        .path("/")
        .maxAge(0)
        .httpOnly(true)
        .secure(true)
        .sameSite("Strict")
        .build();
    ResponseCookie refreshCookie = ResponseCookie.from(refreshCookieName, "")
        .path("/")
        .maxAge(0)
        .httpOnly(true)
        .secure(true)
        .sameSite("Strict")
        .build();

    response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());
  }

  private void setTokens(User user, HttpServletResponse response) {
    String jwt = jwtUtils.generateTokenFromUsername(user.getUsername(), user.getTokenVersion());

    String refreshTokenString = UUID.randomUUID().toString();
    RefreshToken refreshToken = RefreshToken.builder()
        .user(user)
        .hashedToken(refreshTokenString) // In a real app, hash this
        .expiresAt(LocalDateTime.now().plusNanos(refreshExpirationMs * 1_000_000))
        .build();
    refreshTokenRepository.save(refreshToken);

    ResponseCookie cookie = ResponseCookie.from(jwtCookieName, jwt)
        .path("/")
        .maxAge(24 * 60 * 60)
        .httpOnly(true)
        .secure(true)
        .sameSite("Strict")
        .build();

    ResponseCookie refreshCookie = ResponseCookie.from(refreshCookieName, refreshTokenString)
        .path("/")
        .maxAge(7 * 24 * 60 * 60)
        .httpOnly(true)
        .secure(true)
        .sameSite("Strict")
        .build();

    response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());
  }

  private UserDTO mapToDTO(User user) {
    return UserDTO.builder()
        .id(user.getId())
        .firstName(user.getFirstName())
        .lastName(user.getLastName())
        .username(user.getUsername())
        .email(user.getEmail())
        .profilePicture(user.getProfilePicture())
        .providers(user.getProviders())
        .isVerified(user.isVerified())
        .build();
  }
}
