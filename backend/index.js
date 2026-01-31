const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "IPL Data Platform API",
      version: "1.0.0",
      description: "API documentation for IPL Data Platform",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./index.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});
/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     description: Check if backend server is running
 *     responses:
 *       200:
 *         description: Server is healthy
 */
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
/**
 * @swagger
 * /api/teams:
 *   get:
 *     summary: Get all IPL teams
 *     description: Returns list of IPL teams
 *     responses:
 *       200:
 *         description: Successful response
 */

// THIS IS THE IMPORTANT PART
app.get("/api/teams", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM teams ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});
/**
 * @swagger
 * /api/matches:
 *   get:
 *     summary: Get IPL matches
 *     description: Returns IPL match data
 *     responses:
 *       200:
 *         description: Successful response
 */

app.get("/api/matches", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        m.id,
        m.season,
        m.match_date,
        m.venue,
        t1.name AS team1,
        t2.name AS team2,
        tw.name AS winner,
        m.result
      FROM matches m
      JOIN teams t1 ON m.team1_id = t1.id
      JOIN teams t2 ON m.team2_id = t2.id
      LEFT JOIN teams tw ON m.winner_team_id = tw.id
      ORDER BY m.match_date DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
