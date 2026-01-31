import React, { useEffect, useState } from "react";
import { fetchTeams } from "../api/api";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeams()
      .then(setTeams)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading teams...</p>;
  if (error) return <p>Error: {error}</p>;
  if (teams.length === 0) return <p>No teams found</p>;

  return (
    <div>
      <h1>IPL Teams</h1>
      <ul>
        {teams.map(team => (
          <li key={team.id}>
            {team.name} – {team.city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Teams;
