#!/bin/sh

awslocal sqs create-queue --queue-name user-created-deadletter

USER_CREATED_DEADLETTER_QUEUE_ARN=$(awslocal sqs get-queue-attributes --attribute-name QueueArn --queue-url=http://localhost:4566/000000000000/user-created-deadletter |  sed 's/"QueueArn"/\n"QueueArn"/g' | grep '"QueueArn"' | awk -F '"QueueArn":' '{print $2}' | tr -d '"' | xargs)

awslocal sqs create-queue --queue-name user-created --attributes '{
    "RedrivePolicy": "{\"deadLetterTargetArn\":\"'"$USER_CREATED_DEADLETTER_QUEUE_ARN"'\", \"maxReceiveCount\": \"2\"}"
}'