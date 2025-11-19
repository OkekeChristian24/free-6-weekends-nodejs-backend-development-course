# -------------------------
# Stage 1: Builder
# -------------------------
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Install dependencies (with caching)
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build NestJS project
RUN npm run build

# -------------------------
# Stage 2: Production
# -------------------------
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# Copy package.json + lockfile
COPY package*.json ./

# Install only production deps
RUN npm ci --only=production --legacy-peer-deps

# Copy built files from builder
COPY --from=builder /usr/src/app/dist ./dist

# Expose app port
EXPOSE 5000

# Run the app
CMD ["node", "dist/server.js"]
