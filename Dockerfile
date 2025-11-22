FROM node:24-slim

# Update and install security patches
RUN apt-get update && apt-get upgrade -y && apt-get clean

# Set working directory
WORKDIR /app

# Accept the API key as a build argument
ARG TRAIN_API_KEY
# Make it available as an environment variable with VITE_ prefix
ENV VITE_TRAIN_API_KEY=$TRAIN_API_KEY

# Copy package.json/package-lock.json/files and install npm
COPY train-schedule-app/package.json train-schedule-app/package-lock.json ./
RUN npm ci

COPY train-schedule-app/ .

# Port 5173
EXPOSE 5173
# Run the React app on port 5173
CMD ["npm", "run", "dev", "--", "--host"]