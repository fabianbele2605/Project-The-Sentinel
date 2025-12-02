// components/MetricsChart.tsx
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Metric } from "../types/metrics";

interface MetricsChartProps {
    metrics: Metric[];
}

// Tooltip personalizado estilo HUD
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                backgroundColor: 'rgba(3, 5, 8, 0.9)',
                border: '1px solid #00f3ff',
                padding: '10px',
                fontFamily: "'Share Tech Mono', monospace",
                boxShadow: '0 0 10px rgba(0, 243, 255, 0.2)'
            }}>
                <p style={{ color: '#fff', margin: '0 0 5px' }}>T: {label}</p>
                {payload.map((entry: any) => (
                    <p key={entry.name} style={{ color: entry.color, margin: 0, fontSize: '0.9em' }}>
                        {entry.name}: {entry.value}%
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const MetricsChart: React.FC<MetricsChartProps> = ({ metrics }) => {
    const chartData = metrics
        .slice(-30) // Mostramos un poco más de datos
        .reverse()
        .map(metric => ({
            time: new Date(metric.timestamp).toLocaleTimeString([], { hour12: false }), // Formato 24h
            cpu: Number(metric.cpu_usage.toFixed(1)),
            ram: Number(metric.ram_usage.toFixed(1)),
            disk: Number(metric.disk_usage.toFixed(1)),
            load: Number(metric.load_average.toFixed(2))
        }));

    return (
        <div style={{ 
            width: '100%', 
            height: '450px', 
            marginTop: '20px', 
            background: 'rgba(11, 16, 26, 0.5)', 
            border: '1px solid #1f2937',
            padding: '20px',
            borderRadius: '4px',
            position: 'relative'
        }}>
            <h3 style={{ 
                color: '#00f3ff', 
                borderBottom: '1px solid #1f2937', 
                paddingBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <span>SYSTEM_TELEMETRY</span>
                <span style={{ fontSize: '0.8em', color: '#64748b' }}>LIVE_FEED_V.1.0</span>
            </h3>
            
            <ResponsiveContainer width="100%" height="85%">
                {/* Usamos AreaChart para el efecto de relleno "brillante" debajo de la línea */}
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#00f3ff" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorRam" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#bd00ff" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#bd00ff" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                    <XAxis 
                        dataKey="time" 
                        stroke="#64748b" 
                        tick={{ fill: '#64748b', fontSize: 12, fontFamily: 'Share Tech Mono' }}
                    />
                    <YAxis 
                        stroke="#64748b"
                        tick={{ fill: '#64748b', fontSize: 12, fontFamily: 'Share Tech Mono' }} 
                    />
                    <Tooltip content={<CustomTooltip />} />
                    
                    {/* CPU: Cyan Brillante */}
                    <Area 
                        type="monotone" 
                        dataKey="cpu" 
                        stroke="#00f3ff" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorCpu)" 
                        name="CPU"
                    />
                    
                    {/* RAM: Púrpura Neon */}
                    <Area 
                        type="monotone" 
                        dataKey="ram" 
                        stroke="#bd00ff" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorRam)" 
                        name="RAM"
                    />
                    
                    {/* DISK: Naranja (Línea simple para no saturar) */}
                    <Area 
                        type="monotone" 
                        dataKey="disk" 
                        stroke="#ff9e00" 
                        strokeWidth={2}
                        fill="transparent" 
                        name="DISK"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MetricsChart;