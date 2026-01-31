import React, { useEffect, useState } from "react";
import { fetchMatches } from "../api/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const MatchesPerTeam = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchMatches().then(matches => {
      const count = {};

      matches.forEach(match => {
        count[match.team1] = (count[match.team1] || 0) + 1;
        count[match.team2] = (count[match.team2] || 0) + 1;
      });

      const chartData = Object.keys(count).map(team => ({
        team,
        matches: count[team],
      }));

      setData(chartData);
    });
  }, []);

  return (
    <div>
      <h2>Matches per Team</h2>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid />
        <XAxis dataKey="team" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="matches" />
      </BarChart>
    </div>
  );
};

export default MatchesPerTeam;
