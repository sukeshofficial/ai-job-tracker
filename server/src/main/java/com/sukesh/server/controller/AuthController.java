package com.sukesh.server.controller;

import com.sukesh.server.dto.AuthResponse;
import com.sukesh.server.dto.LoginRequest;
import com.sukesh.server.dto.SignupRequest;
import com.sukesh.server.entity.User;
import com.sukesh.server.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;

  @PostMapping("/signup")
  public ResponseEntity<AuthResponse> signup(@Valid @RequestBody SignupRequest request, HttpServletResponse response) {
    return ResponseEntity.ok(authService.signup(request, response));
  }

  @PostMapping("/login")
  public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request, HttpServletResponse response) {
    return ResponseEntity.ok(authService.login(request, response));
  }

  @PostMapping("/logout")
  public ResponseEntity<Void> logout(@AuthenticationPrincipal User user, HttpServletResponse response) {
    authService.logout(user, response);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/me")
  public ResponseEntity<User> me(@AuthenticationPrincipal User user) {
    return ResponseEntity.ok(user);
  }
}
