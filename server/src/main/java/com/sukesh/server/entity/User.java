package com.sukesh.server.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(nullable = false, length = 50)
  private String firstName;

  @Column(nullable = false, length = 50)
  private String lastName;

  @Column(nullable = false, unique = true, length = 30)
  private String username;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(length = 100)
  private String password; // Nullable for OAuth

  @Builder.Default
  private String profilePicture = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  @ElementCollection(fetch = FetchType.EAGER)
  @CollectionTable(name = "user_providers", joinColumns = @JoinColumn(name = "user_id"))
  @Column(name = "provider")
  @Builder.Default
  private Set<String> providers = new HashSet<>();

  @Column(nullable = false)
  @Builder.Default
  private boolean isVerified = false;

  private String googleId;
  private String githubId;

  @Column(nullable = false)
  @Builder.Default
  private int tokenVersion = 0;

  @CreationTimestamp
  @Column(updatable = false)
  private LocalDateTime createdAt;

  @UpdateTimestamp
  private LocalDateTime updatedAt;

  public String getFullName() {
    return firstName + " " + lastName;
  }
}
