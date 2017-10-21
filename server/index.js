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

const CronJob = require("cron").CronJob;

const metrics = require("./utils/metrics");

const { fetchNamespaceUsage, fetchTotalUsage } = metrics;

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

app.get("/api/v1/cluster/metrics", function(req, res, next) {
  const { start, end, type, namespace } = req.query;

  if ([start, end, type, namespace].includes(undefined)) {
    res.sendStatus(422);
    return next();
  }

  knex
    .select("timestamp", "value")
    .from("metrics")
    .whereBetween("timestamp", [start, end])
    .where("type", type)
    .where("namespace", namespace)
    .then(data => data.map(row => [row["timestamp"], row["value"]]))
    .then(data => res.json(data));
});

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

// FIXME: Debug route for getting metrics
app.get("/api/v1/get_metrics", function(req, res) {
  getMetrics();
  res.sendStatus(200);
});

// Serve frontend
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(NODE_PORT);

function getMetrics() {
  console.log("Getting metrics data...");
  const start = new Date();
  const startDate =
    new Date(
      Date.UTC(
        start.getUTCFullYear(),
        start.getUTCMonth(),
        start.getUTCDate(),
        start.getUTCHours() - 1,
        0,
        0
      )
    ) / 1000;
  const endDate =
    new Date(
      Date.UTC(
        start.getUTCFullYear(),
        start.getUTCMonth(),
        start.getUTCDate(),
        start.getUTCHours() - 1,
        59,
        59,
        999
      )
    ) / 1000;

  // 3600s = 1h
  const STEP = 3600;

  Promise.all([
    fetchNamespaceUsage(startDate, endDate, STEP),
    fetchTotalUsage(startDate, endDate, STEP)
  ])
    .then(data => data.reduce((acc, curr) => acc.concat(curr), []))
    .then(data => knex.batchInsert("metrics", data, 100))
    .catch(err => console.error(err));
}
// TODO: Decouple this
new CronJob(
  "0 5 */1 * * *",
  function() {
    console.log("Running", new Date().toUTCString());
    getMetrics();
  },
  null,
  true,
  "Europe/Helsinki"
);
