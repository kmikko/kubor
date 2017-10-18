# Kubor - Kubernetes Overseer
Kubor is a tool to view and analyze resource usage metrics of Kubernetes cluster.

## Overview
Application consists of following components:
 - Frontend (React) that displays cluster usage metrics
 - Backend (Node.js) that serves static frontend assets, provides REST API for frontend, acts as a reverse proxy for Prometheus and handles metrics collection
 - Database (SQLite) that stores cluster cost data and usage metrics

## Requirements
 - [Prometheus](https://github.com/kubernetes/contrib/tree/master/prometheus)


## Local development
Run frontend in development mode
```sh
yarn run start:local
```
Run backend that provides REST API for frontend, acts as reverse proxy for Protmetheus and collects cluster metrics
```sh
cd server
yarn run start:local
```
Finally proxy traffic to Prometheus using `kubectl`.
```sh
kubectl -n monitoring port-forward prometheus-k8s-0 9090
```
Backend will automatically initialize database and run migrations. You can seed cluster cost data by issuing following command in `server` directory
```sh
./node_modules/knex/bin/cli.js seed:run
```

## Build image
Build Docker image including server and static assets
```sh
./build.sh
```

## Deploy to Kubernetes
Edit `PROMETHEUS_URL` in `kubernetes/kubor.yaml` accordingly and then
```sh
kubectl apply -f kubernetes/kubor.yaml
```