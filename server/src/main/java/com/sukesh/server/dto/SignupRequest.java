package com.sukesh.server.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignupRequest {
  @NotBlank
  @Size(min = 1, max = 50)
  private String firstName;

  @NotBlank
  @Size(min = 1, max = 50)
  private String lastName;

  @NotBlank
  @Size(min = 3, max = 30)
  private String username;

  @NotBlank
  @Email
  private String email;

  @NotBlank
  @Size(min = 8)
  private String password;
}
