const express = require("express");
const proxy = require("http-proxy-middleware");
const path = require("path");
const app = express();

const GRAFANA_URL =
  process.env.REACT_APP_GRAFANA_URL ||
  "http://prometheus-prometheus-server.default.svc.cluster.local";

app.use(express.static(path.join(__dirname, "/")));

app.use(
  "/api/proxy",
  proxy({
    target: GRAFANA_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/api/proxy": "/"
    }
  })
);

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(4000);
