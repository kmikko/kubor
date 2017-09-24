const express = require("express");
const proxy = require("http-proxy-middleware");
const path = require("path");
const cors = require("cors");
const app = express();

const GRAFANA_URL =
  process.env.GRAFANA_URL ||
  "http://prometheus-prometheus-server.default.svc.cluster.local";

const NODE_PORT = process.env.NODE_PORT || 4000;

app.use(cors());
app.use(express.static(path.join(__dirname, "/")));
app.use(
  "/api/proxy/grafana",
  proxy({
    target: GRAFANA_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/api/proxy/grafana": "/"
    }
  })
);

/**
 * TOOD: This is just PoC
 * Need to store this information somewhere
 * Also add API endpoints to update prices
 */
app.get("/api/cluster/costs", function(req, res) {
  res.json({
    resources: [
      {
        type: "cpu",
        cost: 100.12
      },
      {
        type: "memory",
        cost: 100.34
      },
      {
        type: "storage",
        cost: 50.56
      },
      {
        type: "network",
        cost: 50.78
      }
    ]
  });
});

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(NODE_PORT);
