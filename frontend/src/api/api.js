const API_BASE_URL = "http://localhost:5000";

export const fetchTeams = async () => {
  const response = await fetch(`${API_BASE_URL}/api/teams`);
  if (!response.ok) throw new Error("Failed to fetch teams");
  return response.json();
};

export const fetchMatches = async () => {
  const response = await fetch(`${API_BASE_URL}/api/matches`);
  if (!response.ok) throw new Error("Failed to fetch matches");
  return response.json();
};
