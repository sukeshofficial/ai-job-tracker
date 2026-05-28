package com.sukesh.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
  private UUID id;
  private String firstName;
  private String lastName;
  private String username;
  private String email;
  private String profilePicture;
  private Set<String> providers;
  private boolean isVerified;
}
