package com.sukesh.server.controller;

import com.sukesh.server.service.AIServiceClient;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthController {

  private final AIServiceClient aiService;

  public HealthController(
      AIServiceClient aiService) {
    this.aiService = aiService;
  }

  @GetMapping("/health")
  public Map<String, Object> health() {

    return Map.of(
        "server", "running",
        "postgres", "connected",
        "ai", aiService.getHealth());
  }
}