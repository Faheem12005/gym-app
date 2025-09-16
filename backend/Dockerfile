# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.11.0

# -------- BUILD STAGE --------
FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /usr/src/app

# Copy package files and install ALL deps (including devDependencies)
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Compile TypeScript
RUN npm run build


# -------- RUNTIME STAGE --------
FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

# Use production environment
ENV NODE_ENV production

# Copy only package.json + package-lock.json for prod install
COPY package*.json ./

# Install only production deps
RUN npm ci --omit=dev && npm cache clean --force

# Copy compiled JS from build stage
COPY --from=build /usr/src/app/dist ./dist

# Copy generated Prisma client
COPY --from=build /usr/src/app/generated ./generated

# Run as non-root user
USER node

# Expose app port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
