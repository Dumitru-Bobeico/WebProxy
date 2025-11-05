# Dockerfile
FROM node:20

WORKDIR /app

# Install netcat (using netcat-openbsd)
RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Compile TypeScript
RUN npm run build

# Expose Node port
EXPOSE 3000

# Run wait-for-cassandra and then start Node
CMD ["npm", "start"]

