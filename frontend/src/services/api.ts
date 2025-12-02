import axios from "axios";
import { Metric, Agent } from "../types/metrics";

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
});

export const metricsApi = {
    // Obtener todos los agentes
    getAgents: async (): Promise<Agent[]> => {
        const response = await api.get<Agent[]>('/metrics');
        return response.data;
    },

    // Obtener metricas de un agente especifico
    getMetrics: async (agentId: string): Promise<Metric[]> => {
        const response = await api.get<Metric[]>(`/metrics/${agentId}`);
        return response.data;
    },
};