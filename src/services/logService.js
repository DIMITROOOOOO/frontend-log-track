import { apiRequest } from "./api";

export async function fetchLogs(params = "") {
  const query = params ? `?${params}` : "";
  return apiRequest(`/logs${query}`);
}

export async function fetchLogById(id) {
  return apiRequest(`/logs/${id}`);
}
