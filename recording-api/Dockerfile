FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy the project files
COPY . .

# Install dependencies
RUN bun install

# Expose the port
EXPOSE 3001

# Start the server
CMD ["bun", "run", "src/index.ts"]