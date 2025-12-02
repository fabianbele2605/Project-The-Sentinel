// components/AgentCard.tsx
import React from "react";
import { Agent } from "../types/metrics";
import '../App.css'; // Asegúrate de crear este archivo o poner el CSS en App.css

interface AgentCardProps {
    agent: Agent;
    onSelect: (agentId: string) => void;
    isSelected: boolean;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onSelect, isSelected }) => {
    return (
        <div
            onClick={() => onSelect(agent.agent_id)}
            className={`nasa-card ${isSelected ? 'active' : ''}`}
        >
            <div className="card-header">
                <div className={`status-dot ${isSelected ? 'pulse' : ''}`}></div>
                <h3 className="agent-id">{agent.agent_id}</h3>
            </div>
            
            <div className="card-body">
                <div className="metric-row">
                    <span className="label">LAST_SEEN</span>
                    <span className="value mono">{new Date(agent.last_seen).toLocaleTimeString()}</span>
                </div>
                <div className="metric-row">
                    <span className="label">METRICS_LOG</span>
                    <span className="value mono">{agent.total_metrics}</span>
                </div>
            </div>
            
            {/* Esquinas decorativas estilo Sci-Fi */}
            <div className="corner top-left"></div>
            <div className="corner bottom-right"></div>
        </div>
    );
};

export default AgentCard;