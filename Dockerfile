# Etapa 1: build da aplicação
FROM node:18 AS builder
WORKDIR /app/frontend
COPY . .
RUN npm install
RUN npm run build

# Etapa 2: servir os arquivos com nginx
FROM nginx:alpine
COPY --from=builder /app/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

