# ─── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY site/my-app/package*.json ./
RUN npm ci --legacy-peer-deps

COPY site/my-app/ .

# Variáveis de build injetadas via docker-compose / GitHub Actions
ARG NEXT_PUBLIC_OPENWEATHER_API_KEY
ENV NEXT_PUBLIC_OPENWEATHER_API_KEY=$NEXT_PUBLIC_OPENWEATHER_API_KEY

RUN npm run build

# ─── Stage 2: Serve ───────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

# Remove config padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/cantinho.conf

# Copia os arquivos estáticos gerados pelo Next.js
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
