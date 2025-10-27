# Stage 1: Dev
FROM node:22-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

# Stage 2: Build
FROM node:22-alpine AS build
WORKDIR /app
COPY --from=dev /app ./
RUN npm run build

# Stage 3: Prod
FROM nginx:alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
