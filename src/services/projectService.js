import { apiRequest } from "./api";

export async function fetchProjects() {
  return apiRequest("/projects");
}

export async function createProject(payload) {
  return apiRequest("/projects", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
