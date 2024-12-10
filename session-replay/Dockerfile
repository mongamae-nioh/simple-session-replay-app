FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the application files
COPY . .

# Build the application
RUN npm run build

# Expose the port
EXPOSE 3000

CMD ["npm", "start"]