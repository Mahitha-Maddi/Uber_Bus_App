# Uber_Bus_App

# Table of Contents
1.	[Uber Frontend]( https://github.com/MahithaMaddi/Uber_Bus_App/tree/main/uberfrontend)
2.	[Uber Backend]( https://github.com/MahithaMaddi/Uber_Bus_App/tree/main/uber_backend)
3.	[Terraform EKS]( https://github.com/MahithaMaddi/Uber_Bus_App/tree/main/Terraform_EKS)
4.	[Terraform CI]( https://github.com/MahithaMaddi/Uber_Bus_App/tree/main/Terraform_CI)
5.	[Monitoring]( https://github.com/MahithaMaddi/Uber_Bus_App/tree/main/Monitoring/PrometheusGraphana)
6.	[Load Testing K6]( https://github.com/MahithaMaddi/Uber_Bus_App/tree/main/LoadTesting_K6)
7.	[Kubernetes CD]( https://github.com/MahithaMaddi/Uber_Bus_App/tree/main/Kubernetes_CD)

# About Application

1.	Token based authentication for user Sign in and Sign up
2.	Web application where user can book a bus and view the bookings history
3.	User can book bus for multiple passengers based on bus availability
4.	Ability to select seat from available seats 
5.	Payment using PayPal
6.	User Registration and Booking confirmation using SMTP Email API 
7.	Creating secure Password reset with Token via Email
8.	React and material UI for frontend development
9.	Session Based data management using local storage
10.	Python Flask used for backend development and deployed on gunicorn server
11.	User and Booking information are stored in MongoDb using Atlas
12.	Terraform to provision EKS cluster and AWS CodeBuild
13.	Kubernetes cluster on AWS 
14.	Monitoring using Prometheus, Grafana
15. Continuous Integration to Elastic Container Registry(A new image is created and deployed to ECR)
16. Proxying HTTP Traffic to a Group of Servers using NGINX
17.	Horizontal Pod Autoscaling (HPA)
18.	Deployed app on cloud with a single command (automation)
19. Responsive UI

# Application Validations:
1. Without login, user cannot access below pages
   •	User profile
   •	Book
   •	Bookings
2. User cannot register if he is already logged in and registered with us.
3. In sign up page, all the fields are validated using regex
4. In book page, below are the validations
   *  Source and destination city cannot be same
   * 	Booking cannot be pass dated
   *	All the fields are mandatory
   *	User cannot book a bus during an overlapping period
   *	User cannot book same bus twice
   
5. On seat selection page, below are the validations
   *	User cannot check out without seat selection 
   *	User will be able to select only available seats
   *	Passenger details cannot be empty and invalid
   *	Seats already booked cannot be booked again 
6. On bookings page, passed booking cannot be canceled
7. On User’s profile page, editable fields are validated using regex and updated in backend DB
8. On forgot password below are the validations
   *	Only registered user can enter his email to receive token via email to change his password
   *	User should enter the token sent via email to change his/her password
   *	All the fields are mandatory and validated using regex


Steps to deploy Continuous Integration:
Pre-requisite: Create repositories in AWS ECR with the following names
1. Navigate to Amazon ECS, click Repositories, and then add two new repositories: 
    uber-be 
    uber-fe 

*	Keep the tags mutable (immutability disabled). Ignore the build, tag, and push instructions if they come up; just set up the images for now.
2.	Clone the repository https://github.com/Mahitha-Maddi/Uber_Bus_App.git and go to Terraform_CI folder and change the auth token in main.tf Source auth resource (**This token should be our github account auth token. Please change this.)

![image](https://user-images.githubusercontent.com/59783725/116328263-a62f9000-a796-11eb-938c-854eca42f77a.png)

       
Change the AWS_ACCOUNT_ID environment variable to your AWS account number in the environment variable (highlighted in the below screenshot) in main.tf

![image](https://user-images.githubusercontent.com/59783725/116328284-afb8f800-a796-11eb-9c19-d5c7eae98c6b.png)

 
Also, change account ID to your AWS account ID in iam-role.tf , as highlighted below

![image](https://user-images.githubusercontent.com/59783725/116328300-bb0c2380-a796-11eb-9ade-19c6ee1f9c8e.png)

 
3. Now navigate to the folder Terraform_CI on the terminal and run the following commands to create the AWS CodeBuild instead of creating it manually on console
```bash
  terraform init
  terraform plan
  terraform apply
```
4.	Now, a new code build project will be automatically created on AWS and whenever a new push is done to github repository, code build will get triggered automatically to push image with version “prod” to ECR repositories uber-be and uber-fe.

# Steps to deploy Continuous Delivery:
Prerequisites: kubectl, docker 20.10.2 and aws-iam-authenticator installed on your machine.
1. Steps to create EKS cluster on AWS and configure your kubectl to interact with your cluster
    *	Navigate to Terraform_EKS folder  and run the following commands on the terminal
```bash
      terraform init
      terraform plan
      terraform apply
      aws eks update-kubeconfig --name terraform-eks-demo
```
2. When you create an Amazon EKS cluster, the IAM entity user or role, such as a federated user that creates the cluster, is automatically granted system:masters permissions in the cluster's RBAC configuration. To grant additional AWS users or roles the ability to interact with your cluster, you must edit the aws-auth ConfigMap within Kubernetes. So here, we are giving cluster access to the CodeBuildKubectlRole role assigned to the AWS Code Build project which is part of Code Pipeline which we will be creating in later steps). 
*	Open config-map-aws-auth.yml  and replace my AWS Account ID with your AWS Account ID. 

![image](https://user-images.githubusercontent.com/59783725/116328351-d70fc500-a796-11eb-905e-0ef0ce16be3d.png)


*	Now run the following command.
     ```bash
     kubectl apply -f config-map-aws-auth.yml
     ```
3.	Then enter the following commands in the terminal to create services(we are just creating load balancers(using service files) in advance, whereas deployment of the pods will be automatically done as part of AWS Code Pipeline’s Code Build which will be doing in later steps.
    ```bash
    kubectl apply -f uberapp-service_be.yaml 
    kubectl apply -f uberapp-service_fe.yaml 
    ```
4. Run the following command to get the load balancers’ IPs for frontend and backend in your terminal
    ```bash
    kubectl get svc
    ```

4.	Steps to host your deployment yaml and buildspec(needed for CodeBuild) files in AWS Code Commit
Go to AWS console and create Code Commit repository and name it as eks-distribution and add the all the files present in the Kubernetes_CD into the Code Commit repository’s main branch.
Also add the following 2 buildspec files and name them as buildspec.yaml and buildspec2.yaml respectively. (Make sure that they are properly indented)
```bash
version: 0.2
    
phases:
  install:
    commands:
      - echo Installing app dependencies...
      - curl -o kubectl https://amazon-eks.s3.us-west-2.amazonaws.com/1.15.10/2020-02-22/bin/linux/amd64/kubectl   
      - chmod +x ./kubectl
      - mkdir -p $HOME/bin && cp ./kubectl $HOME/bin/kubectl && export PATH=$PATH:$HOME/bin
      - echo 'export PATH=$PATH:$HOME/bin' >> ~/.bashrc
      - source ~/.bashrc
  pre_build:
    commands:
      - echo Entered the pre_build phase...
      - echo Logging in to Amazon EKS...
      - aws eks --region $AWS_DEFAULT_REGION update-kubeconfig --name $AWS_CLUSTER_NAME --role-arn arn:aws:iam::847450032545:role/CodeBuildKubectlRole
  build:
    commands:
      - echo Entered the build phase...
      - echo Change directory to secondary source
      - cd $CODEBUILD_SRC_DIR
      - echo List directory
      - ls -la
      - echo Push the latest image to cluster
      - kubectl apply -f backenddeployment.yaml
      - kubectl delete deployment uberappbe
      - kubectl apply -f backenddeployment.yaml
      - kubectl apply -f backend-scale.yaml
      - kubectl get svc
      - kubectl get hpa
      - kubectl get pods
```
---------------------------------------------------------------------------------------------------------
```bash
version: 0.2
    
phases:
  install:
    commands:
      - echo Installing app dependencies...
      - curl -o kubectl https://amazon-eks.s3.us-west-2.amazonaws.com/1.15.10/2020-02-22/bin/linux/amd64/kubectl   
      - chmod +x ./kubectl
      - mkdir -p $HOME/bin && cp ./kubectl $HOME/bin/kubectl && export PATH=$PATH:$HOME/bin
      - echo 'export PATH=$PATH:$HOME/bin' >> ~/.bashrc
      - source ~/.bashrc
  pre_build:
    commands:
      - echo Entered the pre_build phase...
      - echo Logging in to Amazon EKS...
      - aws eks --region $AWS_DEFAULT_REGION update-kubeconfig --name $AWS_CLUSTER_NAME --role-arn arn:aws:iam::847450032545:role/CodeBuildKubectlRole
  build:
    commands:
      - echo Entered the build phase...
      - echo Change directory to secondary source
      - cd $CODEBUILD_SRC_DIR
      - echo List directory
      - ls -la
      - echo Push the latest image to cluster
      - kubectl apply -f frontenddeployment.yaml
      - kubectl delete deployment uberappfe
      - kubectl apply -f frontenddeployment.yaml
      - kubectl apply -f frontend-scale.yaml
      - kubectl get svc
      - kubectl get hpa
      - kubectl get pods
```

5.	Steps to create a new role for AWS Code Build
*	Head over to IAM and create a role with name CodeBuildKubectlRole. It should be applied for codebuild service.
*	Now, create an IAM policy with the name EKS-cluster-access with the following permissions:

![image](https://user-images.githubusercontent.com/59783725/116328397-ebec5880-a796-11eb-9683-314a5f815afc.png)

 

6. Steps to create Code Pipeline
Frontend- Pipeline
*	Pipeline name: eks-pipeline-frontend
*	Service role: New service role
Make sure that Allow AWS CodePipeline to create a service role so it can be used with this new pipeline is selected.
*	Click Next
*	Source Provider: Amazon ECR
*	Repository name: uber-fe
*	Image tag: prod
*	Click Next.
*	Build Provider: AWS CodeBuild
*	Click Create Project
*	Give Project Name as uberCD_frontend
*	Environment image: Managed image
*	Operating System: Amazon Linux 2
*	Runtime: Standard
*	Image: aws/codebuild/amazonlinux2-x86_64-standard:2.0
*	Service role: Existing service role
*	Role ARN: Select the ARN corresponding to CodeBuildKubectlRole role
*	Make sure that Allow AWS CodeBuild to modify this service role so it can be used with this build project is selected.
*	Expand Additional Configuration.
*	Give these environment variables:
      ** AWS_DEFAULT_REGION: us-east-1
      ** AWS_CLUSTER_NAME: terraform-eks-demo
*	Under Build specifications, select Use a buildspec file. Under buildspec name, type buildspec2.yaml
*	Make other required changes and select Continue to CodePipeline.
*	Back in the CodePipeline page, click Next.
*	In the deployment stage, click Skip deploy stage.
*	Review and select Create pipeline.
*	Now open pipeline and Click on Edit
*	Select Edit Stage in the Edit:Source section.
*	Click Add Action.
   ** A new Edit Action page pops up.
*	Action name: EKS_deployment_source
*	Action provider: AWS CodeCommit
*	Repository name: eks-distribution
*	Branch name: main
*	Output artifacts: EKS_deployment_artifacts
*	Leave everything else as default and click Done
*	Click Done again under Editing: eks-pipeline-frontend page.
*	Now click on Edit stage in Edit: Build section.
*	Edit the already existing AWS CodeBuild action by clicking the pencil button.
*	When the new Edit action page pops up, click on Add under Input artifacts and select EKS_deployment_artifacts.
*	Under Primary source, select EKS_deployment_artifacts.
*	Leave everything else as such and click Done.


7.  Now go to your pipeline created and click on Release change

![image](https://user-images.githubusercontent.com/59783725/116328422-f870b100-a796-11eb-9c37-0e57b57609dc.png)

# Steps to create Backend – pipeline:
*	Pipeline name: eks-pipeline-backend
*	Service role: New service role
** Make sure that Allow AWS CodePipeline to create a service role so it can be used with this new pipeline is selected.
*	Click Next
*	Source Provider: Amazon ECR
*	Repository name: uber-be
*	Image tag: prod
*	Click Next.
*	Build Provider: AWS CodeBuild
*	Click Create Project
* Give Project Name as uberCD_backend
* Environment image: Managed image
* Operating System: Amazon Linux 2
* Runtime: Standard
* Image: aws/codebuild/amazonlinux2-x86_64-standard:2.0
* Service role: Existing service role
* Role ARN: Select the ARN corresponding to CodeBuildKubectlRole role
** Make sure that Allow AWS CodeBuild to modify this service role so it can be used with this build project is selected.
* Expand Additional Configuration.
* Give these environment variables:
** AWS_DEFAULT_REGION: us-east-1
** AWS_CLUSTER_NAME: terraform-eks-demo
* Under Build specifications, select Use a buildspec file. 
* Make other required changes and select Continue to CodePipeline.
* Back in the CodePipeline page, click Next.
* In the deployment stage, click Skip deploy stage.
* Review and select Create pipeline.
* Now open pipeline and Click on Edit
* Select Edit Stage in the Edit:Source section.
* Click Add Action. A new Edit Action page pops up.
** Action name: EKS_deployment_source
** Action provider: AWS CodeCommit
* Repository name: eks-distribution
* Branch name: main
* Output artifacts: EKS_deployment_artifacts
* Leave everything else as default and click Done
* Click Done again under Editing: eks-pipeline-backend page.
* Now click on Edit stage in Edit: Build section.
* Edit the already existing AWS CodeBuild action by clicking the pencil button.
* When the new Edit action page pops up, click on Add under Input artifacts and select EKS_deployment_artifacts.
* Under Primary source, select EKS_deployment_artifacts.
* Leave everything else as such and click Done.
8.  Now go to your pipeline created and click on Release change

# Load Testing
1. Go to LoadTesting_K6 and follow the read me file steps

# Monitoring
1. Go to Monitoring/PrometheusGraphana and follow the read me file steps

# Application Architecture

 ![image](https://user-images.githubusercontent.com/60076505/116013887-7e0e2880-a600-11eb-9c64-d4721bc74c8e.png)

# Some of the Application screenshots

![image](https://user-images.githubusercontent.com/59783725/116329521-8188e780-a799-11eb-853b-1c18d6dba0d0.png)

![image](https://user-images.githubusercontent.com/59783725/116329538-8ea5d680-a799-11eb-982d-a6d5a4057ef3.png)

![image](https://user-images.githubusercontent.com/59783725/116329565-a1b8a680-a799-11eb-817b-1db336e7d8e0.png)

![image](https://user-images.githubusercontent.com/59783725/116329611-bb59ee00-a799-11eb-8a74-5821c2e1ec60.png)

![image](https://user-images.githubusercontent.com/59783725/116331531-feb65b80-a79d-11eb-80b3-a10c3b865331.png)

![image](https://user-images.githubusercontent.com/59783725/116331554-0a098700-a79e-11eb-91e2-cb107e796b38.png)
