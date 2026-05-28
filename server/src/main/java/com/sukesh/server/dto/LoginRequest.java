package com.sukesh.server.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
  @NotBlank
  private String login; // Can be email or username

  @NotBlank
  private String password;
}
