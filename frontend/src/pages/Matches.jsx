import React, { useEffect, useState } from "react";
import { fetchMatches } from "../api/api";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMatches()
      .then(setMatches)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading matches...</p>;
  if (error) return <p>Error: {error}</p>;
  if (matches.length === 0) return <p>No matches found</p>;

  return (
    <div>
      <h1>IPL Matches</h1>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Season</th>
            <th>Date</th>
            <th>Venue</th>
            <th>Team 1</th>
            <th>Team 2</th>
            <th>Winner</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {matches.map(match => (
            <tr key={match.id}>
              <td>{match.season}</td>
              <td>{new Date(match.match_date).toLocaleDateString()}</td>
              <td>{match.venue}</td>
              <td>{match.team1}</td>
              <td>{match.team2}</td>
              <td>{match.winner}</td>
              <td>{match.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Matches;
