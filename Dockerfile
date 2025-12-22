FROM node:24-slim AS build

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

# Build the app 
RUN npm run build

# Setup nginx to serve the built app
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf
# Copy built app
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
