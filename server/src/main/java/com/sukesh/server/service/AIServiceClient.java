package com.sukesh.server.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class AIServiceClient {

  private final WebClient webClient = WebClient.create("http://localhost:8000");

  public Map getHealth() {

    return webClient.get()
        .uri("/health")
        .retrieve()
        .bodyToMono(Map.class)
        .block();
  }
}