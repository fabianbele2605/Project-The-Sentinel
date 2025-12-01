package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"sentinel-agent/internal/client"
	"sentinel-agent/internal/metrics"

)

func main() {
	// Configuracion basica
	serverAddr := "localhost:50051"  // Direccion del backend
	apiKey := "sentinel_demo123"     // Clave de API del agente
	interval := 30 * time.Second 	// Enviar metricas a cada 30 segundos

	// Crear cliente gRPC
	grpcClient, err := client.NewGRPCClient(serverAddr, apiKey)
	if err != nil {
		log.Fatalf("Error al crear el cliente gRPC: %v", err)
	}
	defer grpcClient.Close()

	// Canal para manejar señales de sistema (Ctrl+C)
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)

	// Ticker para enviar metricas periodicamente
	ticker := time.NewTicker(interval)
	defer ticker.Stop()

	fmt.Printf("🛡️ Sentinel Agent started\n")
	fmt.Printf("📡 Server: %s\n", serverAddr)
	fmt.Printf("⏱️ Interval: %v\n", interval)

	// Loop principal
	for {
		select {
		case <-ticker.C:
			// Capturar y enviar metricas
			if err := collectAndSend(grpcClient); err != nil {
				log.Printf("Error sending metrics: %v", err)
			} else {
				fmt.Printf(" Metrics sent at %s\n", time.Now().Format("15:04:05"))
			}

		case <-sigChan:
			fmt.Printf("\n Shutting down agent...")
			return
		}
	}
}

func collectAndSend(client *client.GRPCClient) error {
	// Capturar metricas del sistema
	systemMetrics, err := metrics.CollectMetrics()
	if err != nil {
		return fmt.Errorf("failed to collect metrics: %w", err)
	}

	// Enviar al backend
	return client.SendMetrics(systemMetrics);
}