# -----------------------------------------------------------------------------
# Resources: CodeBuild
# -----------------------------------------------------------------------------

resource "aws_codebuild_project" "uberCI" {
  name          = "uberCI"
  description   = "Build and test uber docker image"
  badge_enabled  = "true"
  service_role  = aws_iam_role.codebuild.arn
  build_timeout = "10"
  

  artifacts {
    type = "NO_ARTIFACTS"
  }

  environment {
    compute_type                = "BUILD_GENERAL1_SMALL"
    image                       = "aws/codebuild/standard:4.0"
    type                        = "LINUX_CONTAINER"
    privileged_mode             = "true"
    //image_pull_credentials_type = "SERVICE_ROLE"
    environment_variable {
      name  = "AWS_ACCOUNT_ID"
      value = "847450032545"
    }
    environment_variable {
      name  = "AWS_REGION"
      value = "us-east-1"
    }
  /*   environmentVariables= "[
      {
        "name": "AWS_ACCOUNT_ID",
        "value": "847450032545"
      },
      {
        "name": "AWS_REGION",
        "value": "us-east-1"
      }
      ]" */
  }

#cloudwatch logs
 /*  logs_config {
    cloudwatch_logs {
      group_name  = "log-group"
      stream_name = "log-stream"
    }

  } */
/*   resource "aws_codebuild_source_credential" "example" {
  auth_type   = "PERSONAL_ACCESS_TOKEN"
  server_type = "GITHUB"
  token       = "example"
} */

//COMPARE WITH TERRRAFORM-AWS-GITHUB main.tf line 107
   source {
    type                = "GITHUB"
    location            = "https://github.com/Mahitha-Maddi/Uber_Bus_App.git"
    git_clone_depth     = "1" 
    report_build_status = true
    auth {
      type     = "OAUTH"
      resource = "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"
    }
  } 
/* 
  tags = "${merge(
    var.additional_tags,
    map("ProductDomain", var.product_domain),
    map("Environment", var.environment),
    map("ManagedBy", "terraform")
  )}" */
} 

/* module "ci_codebuild_role" {
  source = "github.com/traveloka/terraform-aws-iam-role.git//modules/service?ref=v1.0.1"

  environment    = "${var.environment}"
  product_domain = "${var.product_domain}"

  role_identifier            = "${local.name}"
  role_description           = "Service Role for ${local.name}"
  role_force_detach_policies = true
  role_max_session_duration  = 43200

  aws_service = "codebuild.amazonaws.com"
} */

resource "aws_codebuild_webhook" "uberCI" {
  project_name = aws_codebuild_project.uberCI.name
/*
  filter_group  {
    # only build PRs
    filter = {
      type    = "EVENT"
      pattern = "PUSH,PULL_REQUEST_CREATED,PULL_REQUEST_UPDATED,PULL_REQUEST_REOPENED"
    }

     # only build PRs to master
    filter = {
      type    = "BASE_REF"
      pattern = "refs/heads/master"
    }
  } */
}


/* resource "aws_iam_role_policy" "ci_main" {
  name   = "${module.ci_codebuild_role.role_name}-main"
  role   = aws_iam_role.codebuild.name
  policy = "${data.aws_iam_policy_document.this.json}"
}

resource "aws_iam_role_policy_attachment" "ci_administrator_access" {
  role       = "${module.ci_codebuild_role.role_name}"
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}

resource "aws_iam_role_policy_attachment" "ci_ecr" {
  role       = "${module.ci_codebuild_role.role_name}"
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}  */
