# Kubernetes_CD

This is used to deploy ECR image containers to EKS cluster. 


## How to run the web app:

1.  You’ll need to have kubectl and docker 20.10.2 installed on your machine.

2.  Clone the repository
    ```bash
    git clone https://github.com/Mahitha-Maddi/Uber_Bus_App.git
    ```
3.  Open the project in any of the IDE e.g VS Code

4.  Then enter the commands in the terminal to create services and pods using deployment files as follows
    ```
    bash
    cd kubernetes_files
    kubectl apply -f backenddeployment.yaml --record
    kubectl apply -f frontenddeployment.yaml --record
    kubectl apply -f uberapp-service_be.yaml --record
    kubectl apply -f uberapp-service_fe.yaml --record
    ```
5. Once the pods are created, run the following command to get the pod names in your terminal
    ```bash
    kubectl get pods
    ```


