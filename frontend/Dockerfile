FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]





# --- Stage 1: Build the React App ---
# # Use a Node image to build our static files
# FROM node:18-alpine AS builder

# WORKDIR /app

# # Copy package files and install dependencies
# COPY package*.json ./
# RUN npm install

# # Copy the rest of the source code
# COPY . .

# # Build the production-ready static files
# RUN npm run build

# # --- Stage 2: Serve the app with Nginx ---
# # Use a lightweight Nginx image for the final production image
# FROM nginx:stable-alpine

# # Copy the built static files from the 'builder' stage
# COPY --from=builder /app/build /usr/share/nginx/html

# # Copy our custom Nginx configuration
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Expose port 80 to the outside world
# EXPOSE 80

# # Start Nginx in the foreground
# CMD ["nginx", "-g", "daemon off;"]