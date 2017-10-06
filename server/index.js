const express = require("express");
const proxy = require("http-proxy-middleware");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const NODE_ENV = process.env.NODE_ENV || "production";
const knexConfig = require("./knexfile.js")[NODE_ENV];
const knex = require("knex")(knexConfig);

const PROMETHEUS_URL =
  process.env.PROMETHEUS_URL ||
  "http://prometheus-prometheus-server.default.svc.cluster.local";

const NODE_PORT = process.env.NODE_PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "/")));
app.use(
  "/api/v1/proxy/prometheus",
  proxy({
    target: PROMETHEUS_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/api/v1/proxy/prometheus": "/"
    }
  })
);

// GET /api/v1/cluster/costs?year=2017&month=9
// List all cluster costs, filter by year and month
app.get("/api/v1/cluster/costs", function(req, res) {
  let query = knex
    .select(
      "id",
      "year",
      "month",
      "resource_type AS type",
      "resource_label AS label",
      "cost",
      "currency"
    )
    .from("costs");

  if (typeof req.query.year !== "undefined") {
    const year = parseInt(req.query.year, 10);
    query.where("year", year);
  }
  if (typeof req.query.month !== "undefined") {
    const month = parseInt(req.query.month, 10);
    query.where("month", month);
  }

  query.then(data => res.json(data));
});

// Create or update cost(s), takes array or object as an argument
// POST /api/v1/cluster/costs
app.post("/api/v1/cluster/costs", function(req, res) {
  const body = Array.isArray(req.body) ? req.body : [req.body];
  const costs = body.map(c => ({
    year: c.year,
    month: c.month,
    resource_type: c.type,
    resource_label: c.label || "",
    cost: c.cost,
    currency: c.currency || "USD"
  }));

  knex("costs")
    .insert(costs)
    .then(() => res.sendStatus(204))
    .catch(err => res.sendStatus(422));
});

// Get single costs item
// GET /api/v1/cluster/costs/:id
app.get("/api/v1/cluster/costs/:id", function(req, res) {
  const id = req.params.id;
  knex("costs")
    .where("id", id)
    .limit(1)
    .then(data => res.json(data[0]))
    .catch(err => res.sendStatus(422));
});

// Edit single costs item
// PUT /api/v1/cluster/costs/:id
app.put("/api/v1/cluster/costs/:id", function(req, res) {
  const id = req.params.id;
  knex("costs")
    .where("id", id)
    .update({
      year: req.body.year,
      month: req.body.month,
      resource_type: req.body.type,
      resource_label: req.body.label || "",
      cost: req.body.cost,
      currency: req.body.currency || "USD"
    })
    .then(() => res.sendStatus(204))
    .catch(err => res.sendStatus(422));
});

// Get costs item by ID
// DELETE /api/v1/cluster/costs/:id
app.delete("/api/v1/cluster/costs/:id", function(req, res) {
  const id = req.params.id;
  knex("costs")
    .where("id", id)
    .del()
    .then(() => res.sendStatus(204))
    .catch(err => res.sendStatus(422));
});

// Serve frontend
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(NODE_PORT);
