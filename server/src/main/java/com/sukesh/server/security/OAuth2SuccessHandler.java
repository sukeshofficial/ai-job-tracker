package com.sukesh.server.security;

import com.sukesh.server.entity.User;
import com.sukesh.server.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

  private final UserRepository userRepository;
  private final JwtUtils jwtUtils;

  @Value("${jwt.cookie-name}")
  private String jwtCookieName;

  @Value("${jwt.expiration-ms}")
  private int jwtExpirationMs;

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
      Authentication authentication) throws IOException, ServletException {
    OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
    final String email = oauth2User.getAttribute("email");
    if (email == null) {
      throw new RuntimeException("Email not found from OAuth2 provider");
    }

    String nameRaw = oauth2User.getAttribute("name");
    final String name = nameRaw != null ? nameRaw : "";

    String pictureRaw = oauth2User.getAttribute("picture");
    if (pictureRaw == null) {
      pictureRaw = oauth2User.getAttribute("avatar_url"); // GitHub fallback
    }
    final String picture = pictureRaw != null ? pictureRaw : "";

    User user = userRepository.findByEmail(email).orElseGet(() -> {
      User newUser = User.builder()
          .email(email)
          .firstName(name != null && !name.isEmpty() ? name.split(" ")[0] : "")
          .lastName(name != null && name.contains(" ") ? name.substring(name.indexOf(" ") + 1) : "")
          .username(email.split("@")[0])
          .profilePicture(picture)
          .isVerified(true)
          .providers(Set.of("google"))
          .tokenVersion(0)
          .build();
      return userRepository.save(newUser);
    });

    String jwt = jwtUtils.generateTokenFromUsername(user.getUsername(), user.getTokenVersion());

    ResponseCookie cookie = ResponseCookie.from(jwtCookieName, jwt)
        .path("/")
        .maxAge(jwtExpirationMs / 1000)
        .httpOnly(true)
        .secure(true)
        .sameSite("Strict")
        .build();

    response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    getRedirectStrategy().sendRedirect(request, response, "http://localhost:5173/");
  }
}
