# Uber_Bus_App

This is terraform script to provision EKS cluster and worker nodes on AWS

## How to run the terraform script:

1.  You’ll need to have terraform Terraform v0.14.7 installed on your machine.

2.  Clone the repository
    ```bash
    git clone https://github.com/Mahitha-Maddi/Uber_Bus_App.git
    ```

3.  Open the project in any of the IDE e.g VS Code

4.  Then enter the commands in the terminal to create resources mentioned in the terraform script as follows
    ```bash
       terraform init
       terraform plan
       terraform apply
    ```
5. Install IAM authenticator by running the following command and make sure to configure aws before executing these commands
    ```bash
    choco install -y aws-iam-authenticator
    ```
6.  Run the following command to update the Kube config manually via AWS CLI
    ```bash
    aws eks update-kubeconfig --name terraform-eksdemo

    ```
5. Run the following commands to create the worker configMap
   ```bash
    terraform output config_map_aws_auth > ./config-map-aws-auth.yml
    
    kubectl apply -f config-map-aws-auth.yml

   ```

