
# NX SQS Microservices

This project contains two microservices that use **SQS** to handle user registration events and send Apple push notifications. The project also uses **Prometheus** to collect metrics.

## Prerequisites

- **Node.js** (version 20.x or higher)
- **Docker** and **Docker Compose**
- **PostgreSQL** (can be launched in Docker via Docker Compose)

## Setup Instructions

### 1. Ensure Docker is running

Before starting the project, ensure Docker is up and running. The project relies on Docker to emulate services like PostgreSQL and SQS.

### 2. Adjust file permissions (if needed)

If the `init-aws.sh` file does not have execution permissions, first run the following command:

```bash
chmod +x init-aws.sh
```

This will allow you to execute the script needed to initialize AWS resources (e.g., SQS queues).

### 3. Create a `.env` file

If the `.env` file does not exist, create one with the necessary environment variables. **Never store `.env` files in Git**; they are only for local testing purposes.

Here is an example of a `.env` file for **local testing only**:

```bash
DATABASE_URL="postgresql://universe_user:universe_password@localhost:5432/universe_db?schema=public"
AWS_REGION=eu-central-1
SQS_QUEUE_URL=http://sqs.eu-central-1.localstack.cloud:4566/000000000000/user-created
SQS_QUEUE_NAME=user-created
SQS_ENDPOINT=http://localhost:4566
```

**Important:** In production, never commit sensitive data like database URLs, AWS credentials, or other secrets to Git or any public repositories. Use secure solutions like environment variable managers or secret managers.

### 4. Run the project

To start all necessary services and applications, use the following command:

```bash
npm run start-all
```

This command will:

1. **Launch Docker containers** (including PostgreSQL and LocalStack for emulating AWS SQS).
2. **Apply database migrations** with Prisma.
3. **Start the Node.js server** to handle requests.

### 5. Usage

After the server is running, you can register users by making a POST request to the following endpoint:

```
POST http://localhost:3000/users/register
```

#### Request parameters:

- **Body** (JSON format):
  ```json
  {
    "email": "user@example.com",
    "password": "your_password"
  }
  ```

- **Query parameter** (optional):
  - `delay` (optional delay in milliseconds before processing the event):
    ```
    http://localhost:3000/users/register?delay=5000
    ```

This will add an optional delay before the user registration event is processed.

### 6. Additional commands

- **Manually bring up Docker containers**:
  ```bash
  npm run docker-up
  ```

- **Apply Prisma database migrations**:
  ```bash
  npm run prisma-migrate
  ```

- **Start the server**:
  ```bash
  npm run start
  ```

## System Components

- **PostgreSQL**: Used to store user data.
- **SQS**: Used to send user registration events.
- **Prometheus**: Used to collect metrics (e.g., request duration).

## API Requests and Responses

**User Registration Request:**

```
POST /users/register
```

- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "your_password"
  }
  ```

- **Query parameter**:
  - `delay` (optional delay in milliseconds before processing the event).

---

### Troubleshooting

If you encounter any issues while running the project or executing commands, ensure all dependencies are installed correctly and that Docker containers are running.
