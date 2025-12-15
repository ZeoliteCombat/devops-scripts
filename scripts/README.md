#!/bin/bash

# Create a virtual environment for the project
python3 -m venv venv

# Activate the virtual environment
source venv/bin/activate

# Install the required packages
pip install -r requirements.txt

# Set up the AWS CLI
aws configure set aws_access_key_id <YOUR_AWS_ACCESS_KEY_ID>
aws configure set aws_secret_access_key <YOUR_AWS_SECRET_ACCESS_KEY>

# Set up the AWS region
export AWS_DEFAULT_REGION=us-west-2

# Set up the Docker username
export DOCKER_USERNAME=<YOUR_DOCKER_USERNAME>

# Build the Docker image
docker build -t devops-scripts .

# Run the Docker container
docker run -it -p 8000:8000 devops-scripts

# Run the Ansible playbook
ansible-playbook -i inventory site.yml

# Run the AWS CLI command
aws s3 synch --delete --acl public-read s3://my-bucket

# Run the Jenkins job
curl -X POST \
  https://jenkins.example.com/job/devops-scripts/build \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{"parameter": {"KEY": "VALUE"}}'