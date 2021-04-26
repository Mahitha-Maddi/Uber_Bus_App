# Deploy Prometheus 
## Go to Monitoring/PrometheusGrafana and run below commands sequentially
```
$ kubectl create namespace monitoring 
$ kubectl create -f clusterRole.yaml 
$ kubectl create -f config-map.yaml 
$ kubectl create -f prometheus-deployment.yaml --namespace=monitoring 
$ kubectl get deployments --namespace=monitoring 
$ kubectl get deployments --all-namespaces 
$ kubectl create -f prometheus-service.yaml --namespace=monitoring 
$ kubectl get svc --namespace=monitoring
Note: Now you can access the Prometheus dashboard using the Load Balancer’s IP on port 80
```
# Deploy Grafana
## Follow below command sequentially
```
$ kubectl create -f grafana-datasource-config.yaml 
$ kubectl create -f grafana-datasource-deploy.yaml 
$ kubectl create -f grafana-datasource-service.yaml 
$ kubectl get svc --namespace=monitoring
```

Note: Now you should be able to access the Grafana dashboard using the service’s External IP on port 3000 
•	User:admin 
•	Password:admin

# To view Logging and Monitoring Dashboard
```
$ kubectl get pods --namespace monitoring 
```
# To view all the pods in prometheus monitoring dashboard
```
$ kubectl port-forward prometheus-prometheus-prometheus-oper-prometheus-0 9090 --namespace monitoring or use Prometheus dashboard using the Load Balancer’s IP on port 80
```
# To view the grafana dashboard on localhost:3000 All the configuration has been built in and fully functional
# port forward the grafana pod as mentioned below
```
$ kubectl port-forward prometheus-grafana-85b4dbb556-kjpsv 3000 --namespace monitoring or Grafana dashboard using the service’s External IP on port 3000
```

# Kubernetes autoscaling with custom metrics

In this application we have deployed an app mockmetrics which will generate a count at `/metrics`. These metrics will be scraped by Prometheus. With the help of [`k8s-prometheus-adapter`], we will create APIService `custom.metrics.k8s.io`, which then will be utilized by HPA to scale the deployment of mockmetrics app to increase number of replicas and generate load on the application

## Prerequisite
- You have a running Kubernetes cluster somewhere with kubectl configured to access it.

- We will be using [Helm](https://helm.sh/docs/intro/install/) to install some of the components we need for this demo.


## Installing Prometheus Operator and Prometheus
Now, we will install [kube-prometheus-stack](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack) chart. It will deploy [Prometheus Operator](https://github.com/coreos/prometheus-operator) and create an instance of Prometheus using it.

- Add prometheus-community Helm repository and create `monitoring` namespace.

  ```console
  $ helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
  "prometheus-community" has been added to your repositories
  
  $ helm repo add stable https://charts.helm.sh/stable
  "stable" has been added to your repositories
  
  $ helm repo update
  Hang tight while we grab the latest from your chart repositories...
  ...Successfully got an update from the "prometheus-community" chart repository
  ...Successfully got an update from the "stable" chart repository
  Update Complete. ⎈ Happy Helming!⎈ 

  ```
- Install kube-prometheus-stack.

  This will install Prometheus Operator in the namespace `monitoring` and it will create [`CustomResourceDefinitions`](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#customresourcedefinitions) for `AlertManager`, `Prometheus` and `ServiceMonitor` etc.
  ```
  $ helm install mon \
      --namespace monitoring \
      prometheus-community/kube-prometheus-stack
  ```
  ```console
  $ kubectl get crd --namespace monitoring
  NAME                                        
  alertmanagers.monitoring.coreos.com         
  podmonitors.monitoring.coreos.com           
  prometheuses.monitoring.coreos.com          
  servicemonitors.monitoring.coreos.com       
  …
  ```

- Check if all the components are deployed properly.
  ```console
  $ kubectl get pods --namespace monitoring
  NAME                                                    READY   STATUS    RESTARTS   AGE
  alertmanager-mon-kube-prometheus-stack-alertmanager-0   2/2     Running   0          7m1s
  mon-grafana-5f64b7d85c-z58lc                            2/2     Running   0          7m19s
  mon-kube-prometheus-stack-operator-7886b467cd-t5x8l     1/1     Running   1          7m19s
  mon-kube-state-metrics-84cc9dd77b-fj8nx                 1/1     Running   2          7m19s
  mon-prometheus-node-exporter-8w5q6                      1/1     Running   1          7m19s
  prometheus-mon-kube-prometheus-stack-prometheus-0       2/2     Running   1          41s
  ```

## Deploying the mockmetrics application

It's a simple web server written in Go which exposes total hit count at `/metrics` endpoint. We will create a deployment and service for it.

- This will create Deployment, Service, HorizontalPodAutoscaler in the `default` namespace and ServiceMonitor in `monitoring` namespace.
  ```console
  $ kubectl apply -f deploy/metrics-app/
  deployment.apps/mockmetrics-deploy created
  horizontalpodautoscaler.autoscaling/mockmetrics-app-hpa created
  servicemonitor.monitoring.coreos.com/mockmetrics-sm created
  service/mockmetrics-service created

  $ kubectl get svc,hpa
  NAME                          TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)              AGE
  service/mockmetrics-service   ClusterIP   10.111.240.149   <none>        80/TCP               51s

  NAME                                                      REFERENCE                       TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
  horizontalpodautoscaler.autoscaling/mockmetrics-app-hpa   Deployment/mockmetrics-deploy   <unknown>/100   1         10        1          51s
  ```
  _The `<unknown>` field will have a value once we deploy the custom metrics API server._

  The ServiceMonitor will be picked up by Prometheus, so it tells Prometheus to scrape the metrics at `/metrics` from the mockmetrics app at every 10s.
  <details>


## Clean up (optional)
To clean up all the resources created as part of this tutorial, run the following commands.

```console
$ helm delete prometheus-adapter --namespace prometheus-adapter
release "prometheus-adapter" uninstalled

$ kubectl delete -f deploy/metrics-app/
deployment.apps "mockmetrics-deploy" deleted
horizontalpodautoscaler.autoscaling "mockmetrics-app-hpa" deleted
servicemonitor.monitoring.coreos.com "mockmetrics-sm" deleted
service "mockmetrics-service" deleted

$ helm delete mon --namespace monitoring
release "mon" uninstalled
```

## Other references and credits
- Writing ServiceMonitor
  - [Cluster Monitoring using Prometheus Operator](https://github.com/coreos/prometheus-operator/blob/master/Documentation/user-guides/cluster-monitoring.md)
  - [Running Exporters](https://github.com/coreos/prometheus-operator/blob/master/Documentation/user-guides/running-exporters.md)
- [kube-prometheus](https://github.com/coreos/prometheus-operator/tree/master/helm/kube-prometheus)
- [Get Kubernetes Cluster Metrics with Prometheus in 5 Minutes](https://akomljen.com/get-kubernetes-cluster-metrics-with-prometheus-in-5-minutes/)
- [Kubernetes Metrics Server](https://github.com/kubernetes-incubator/metrics-server)
- [Custom Metrics Adapter Server Boilerplate](https://github.com/kubernetes-incubator/custom-metrics-apiserver)
- [Custom Metrics API design document](https://github.com/kubernetes/community/blob/master/contributors/design-proposals/instrumentation/custom-metrics-api.md)
- [DirectXMan12/k8s-prometheus-adapter](https://github.com/DirectXMan12/k8s-prometheus-adapter)
- [luxas/kubeadm-workshop](https://github.com/luxas/kubeadm-workshop)
- [Querying Prometheus](https://prometheus.io/docs/prometheus/latest/querying/basics/)

