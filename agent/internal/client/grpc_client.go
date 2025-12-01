package client

import (
	"context"
	"fmt"
	"time"

	"sentinel-agent/internal/metrics"
	pb "sentinel-agent/proto/sentinel-agent/proto"

	"google.golang.org/grpc"
)

type GRPCClient struct {
	conn 	*grpc.ClientConn
	client 	pb.SentinelServiceClient
	apiKey 	string
}

func NewGRPCClient(serverAddr, apiKey string) (*GRPCClient, error) {
	conn, err := grpc.Dial(serverAddr, grpc.WithInsecure())
	if err != nil {
		return nil, err
	}

	client := pb.NewSentinelServiceClient(conn)
	return &GRPCClient{
		conn: 	conn,
		client: client,
		apiKey: apiKey,
	}, nil
}

func (c *GRPCClient) SendMetrics(metrics *metrics.SystemMetrics) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	request := &pb.MetricsReport{
		AgentId: 		"agent-001",
		Timestamp: 		time.Now().Unix(),
		Status:  		pb.ServerStatus_HEALTHY,
		CpuUsage:  		metrics.CpuPercent,
		RamUsage:   	metrics.MemPercent,
		DiskUsage:    	metrics.DiskPercent,
		ResponseTimeMs: 0,
		LoadAverage: 	metrics.LoadPercent,
		ErrorRate: 		0,
		SwapUsage: 		0,
		ApiKey: 		c.apiKey,	
	}

	response, err := c.client.SendMetrics(ctx, request)
	if err != nil {
		return err
	}

	if !response.Success {
		return fmt.Errorf("failed to send metrics: %s", response.Message)
	}
	return nil
}

func (c *GRPCClient) Close() error {
	return c.conn.Close()
}