import React, { useEffect, useState } from "react";
import { fetchMatches } from "../api/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const WinsPerSeason = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchMatches().then(matches => {
      const wins = {};

      matches.forEach(match => {
        wins[match.season] = (wins[match.season] || 0) + 1;
      });

      const chartData = Object.keys(wins).map(season => ({
        season,
        wins: wins[season],
      }));

      setData(chartData);
    });
  }, []);

  return (
    <div>
      <h2>Matches per Season</h2>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid />
        <XAxis dataKey="season" />
        <YAxis />
        <Tooltip />
        <Line dataKey="wins" />
      </LineChart>
    </div>
  );
};

export default WinsPerSeason;
