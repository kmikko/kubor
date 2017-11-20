# Kubor - Kubernetes Overseer
Kubor is a tool to view and analyze resource usage metrics of Kubernetes cluster. It groups usage metrics on namespace level and calculates hourly usage averages from total resources available. It abstracts cluster resources into four core metrics (cpu, memory, network and storage) for which monthly costs can be set. This can be used to help generating invoices in multi-tenant environments.

![kubor](https://user-images.githubusercontent.com/2776729/32996747-8d58a952-cd8f-11e7-9fea-63fcb5ff9987.png)

## Overview
Application consists of following components:
 - Frontend (React) that displays cluster usage metrics and costs.
 - Backend (Node.js) that serves static frontend assets, provides REST API for frontend, acts as a reverse proxy for Prometheus and handles metrics collection.
 - Database (SQLite) that stores cluster cost data and usage metrics.

## Requirements
 - [Prometheus](https://github.com/kubernetes/contrib/tree/master/prometheus) for resource usage metrics
 - Configured [Persistent Volume](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) for database


## Local development
Kubor requires access to Prometheus to get resource usage metrics. For local development a simple port forward to Prometheus is sufficient. Another option is to deploy the application container to (local minikube) cluster and then interact with it using tools like [Telepresence](https://www.telepresence.io/).

### Requirements
 - [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
 - [Minikube](https://github.com/kubernetes/minikube)

## Without container registry
Run frontend in development mode
```sh
cd client
yarn run start:local
```
Run backend that provides REST API for frontend, acts as reverse proxy for Protmetheus and collects cluster metrics.
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

## With private container registry using Minikube
For this, we'll be using local container registry inside Kubernetes. I will follow steps mentioned in [this great blog post](https://mtpereira.com/local-development-k8s.html) that covers setting up the container registry. We also need to start `minikube` with insecure registry flag to enable insecure communication between the docker engine and registries.
```sh
minikube start --insecure-regisry localhost:5000
```
Deploy container registry.
```sh
kubectl apply -f deploy/local-registry.yml
```
Access Docker daemon inside minikube
```sh
eval $(minikube docker-env)
```
Build Docker image.
```sh
./build.sh
```
Tag it and push it to our registry
```sh
docker tag kubor:<version> localhost:5000/kubor:<version>
docker push localhost:5000/kubor:<version>
```
Edit following lines in file `deploy/kubor.yaml`:
 - 45: `image` to match the image version
 - 53: `value` of `PROMETHEUS_URL` to match your Prometheus deployment

and finally deploy to Kubernetes cluster
```sh
kubectl apply -f deploy/kubor.yaml
```
Get URL to access the app
```sh
minikube service kubor --url
```

## Build image
Build Docker image including server and static assets
```sh
./build.sh
```

## Deploy to Kubernetes
Edit `image` and `PROMETHEUS_URL` in `kubernetes/kubor.yaml` accordingly and then
```sh
kubectl apply -f kubernetes/kubor.yaml
```
