// components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { Agent, Metric } from '../types/metrics';
import { metricsApi } from '../services/api';
import AgentCard from './AgentCard';
import MetricsChart from './MetricsChart';

const Dashboard: React.FC = () => {
    // ... (Tu lógica de estado y useEffects se mantiene IGUAL) ...
    // Solo copio la parte visual (return) para ahorrar espacio
    const [agents, setAgents] = useState<Agent[]>([]);
    const [selectedAgent, setSelectedAgent] = useState<string>('');
    const [metrics, setMetrics] = useState<Metric[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => { loadAgents(); }, []);
    useEffect(() => { if (selectedAgent) loadMetrics(selectedAgent); }, [selectedAgent]);

    // Auto-refresh cada 30segundos (sincronizado con el agente)
    useEffect(() => {
        const intervalId = setInterval(() => {
            loadAgents(); // Actualiza lista de agentes
            if (selectedAgent) {
                loadMetrics(selectedAgent);
            } 
        }, 30000);  // 30 segundos = mismo intervalo del agente

        return () => clearInterval(intervalId);
    }, [selectedAgent]);

    const loadAgents = async () => { /* ... tu lógica ... */ 
        // Mock para probar si no tienes la API corriendo:
        // setAgents([{agent_id: 'SENTINEL-01', last_seen: new Date().toISOString(), total_metrics: 1240}]);
        // setSelectedAgent('SENTINEL-01');
        // setLoading(false);
        try {
             const agentsData = await metricsApi.getAgents();
             setAgents(agentsData);
             if (agentsData.length > 0) setSelectedAgent(agentsData[0].agent_id);
        } catch (error) { console.error(error); } finally { setLoading(false); }
    };

    const loadMetrics = async (agentId: string) => { /* ... tu lógica ... */ 
         try {
             const metricsData = await metricsApi.getMetrics(agentId);
             setMetrics(metricsData);
         } catch (error) { console.error(error); }
    };

    if (loading) {
        return <div style={{ color: '#00f3ff', textAlign: 'center', marginTop: '20vh', fontFamily: 'Share Tech Mono' }}>INITIALIZING SYSTEM...</div>;
    }

    return (
        <div style={{ padding: '20px', maxWidth: '1600px', margin: '0 auto' }}>
            <header style={{ 
                borderBottom: '1px solid #00f3ff', 
                paddingBottom: '20px', 
                marginBottom: '30px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end'
            }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '2.5rem', color: '#fff' }}>🛡️ SENTINEL <span style={{color: '#00f3ff'}}>OS</span></h1>
                    <button
                        onClick={() => {
                            loadAgents();
                            if (selectedAgent) loadMetrics(selectedAgent);
                        }}
                        style={{
                            background: 'var(--nasa-cyan)',
                            color: 'var(--nasa-bg)',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontFamily: 'Share Tech Mono',
                            fontSize: '12px',
                            letterSpacing: '1px'
                        }}
                    >
                        🔁REFRESH
                    </button>
                    <span style={{ color: '#64748b', letterSpacing: '4px', fontSize: '0.8rem' }}>SECURE MONITORING STATION</span>
                </div>
                <div style={{ textAlign: 'right', fontFamily: 'Share Tech Mono', color: '#00f3ff' }}>
                    <div>STATUS: ONLINE</div>
                    <div>{new Date().toLocaleDateString()}</div>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '20px' }}>
                
                {/* Columna Izquierda: Lista de Agentes */}
                <div className="agents-panel">
                    <h3 style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '15px', paddingLeft: '10px' }}>ACTIVE UNITS ({agents.length})</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {agents.map(agent => (
                            <AgentCard
                                key={agent.agent_id}
                                agent={agent}
                                onSelect={setSelectedAgent}
                                isSelected={selectedAgent === agent.agent_id}
                            />
                        ))}
                    </div>
                </div>

                {/* Columna Derecha: Gráficas Main */}
                <div className="main-panel">
                    {selectedAgent && metrics.length > 0 ? (
                        <MetricsChart metrics={metrics} />
                    ) : (
                         <div style={{ 
                             height: '400px', 
                             border: '1px dashed #1f2937', 
                             display: 'flex', 
                             alignItems: 'center', 
                             justifyContent: 'center',
                             color: '#1f2937'
                         }}>
                             AWAITING DATA STREAM...
                         </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;