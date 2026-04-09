FROM node:20-alpine AS builder
WORKDIR /app

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Copy package files from the sub-directory first for better caching
COPY iskm-frontend/package.json iskm-frontend/package-lock.json* iskm-frontend/yarn.lock* ./
RUN npm install

# Copy the rest of the frontend code
COPY iskm-frontend/ ./
RUN npm run build

# Run stage
FROM nginx:alpine
# Copy built assets to nginx
COPY --from=builder /app/dist /usr/share/nginx/html
# Copy custom nginx configuration for React router
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
