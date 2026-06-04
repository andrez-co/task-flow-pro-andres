# Builder
FROM node:24-alpine AS builder
WORKDIR /app

# Usar npm en el contenedor para evitar requisitos interactivos de pnpm
COPY package.json ./
RUN npm install

# Copiar el resto del código y compilar
COPY . .
RUN npm run build

# Runtime
FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production

# Copiar modules y artefactos desde el builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Eliminar dependencias de desarrollo para ahorrar espacio
RUN npm prune --production || true

EXPOSE 3000
CMD ["node", "dist/main.js"]