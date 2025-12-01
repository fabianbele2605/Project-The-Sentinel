package metrics

import (
	"github.com/shirou/gopsutil/v3/cpu"
	"github.com/shirou/gopsutil/v3/mem"
	"github.com/shirou/gopsutil/v3/disk"
	"github.com/shirou/gopsutil/v3/load"
)

type SystemMetrics struct {
	CpuPercent float32
	MemPercent float32
	DiskPercent float32
	LoadPercent float32
}

func CollectMetrics() (*SystemMetrics, error) {
	// CPU
	cpuPercent, err := cpu.Percent(0, false)
	if err != nil {
		return nil, err
	}
	// Memory
	memPercent, err := mem.VirtualMemory()
	if err != nil {
		return nil, err
	}
	// Disk
	diskPercent, err := disk.Usage("/")
	if err != nil {
		return nil, err
	}
	// Load
	loadPercent, err := load.Avg()
	if err != nil {
		return nil, err
	}

	return &SystemMetrics{
		CpuPercent: float32(cpuPercent[0]),
		MemPercent: float32(memPercent.UsedPercent),
		DiskPercent: float32(diskPercent.UsedPercent),
		LoadPercent: float32(loadPercent.Load1),
	}, nil
}