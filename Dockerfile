FROM node:18-alpine AS base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./

ARG NODE_ENV
ENV NODE_ENV "$NODE_ENV"

FROM base AS production
WORKDIR /app
RUN npm install
COPY . .
RUN npm run build
CMD npm run start

FROM base AS development
WORKDIR /app
RUN npm ci
COPY . .
CMD npm run dev