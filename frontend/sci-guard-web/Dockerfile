# Build step
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

# Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: replace default Nginx config if needed
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
