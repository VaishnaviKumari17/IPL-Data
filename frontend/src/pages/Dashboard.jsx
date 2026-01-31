import React from "react";
import MatchesPerTeam from "../charts/MatchesPerTeam";
import WinsPerSeason from "../charts/WinsPerSeason";

const Dashboard = () => {
  return (
    <div>
      <h1>IPL Dashboard</h1>
      <p>Welcome to the IPL project</p>

      <MatchesPerTeam />
      <WinsPerSeason />
    </div>
  );
};

export default Dashboard;
