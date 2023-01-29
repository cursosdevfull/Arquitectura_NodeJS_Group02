# Stage 1 - the build process
FROM node:alpine3.16 as BUILD

WORKDIR /build

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# Stage 2 - the production environment
FROM node:alpine3.16

WORKDIR /app

COPY --from=BUILD /build/package.json .
COPY --from=BUILD /build/dist ./dist
COPY --from=BUILD /build/.env ./.env
COPY --from=BUILD /build/node_modules ./node_modules

ENV NODE_ENV=production

CMD ["npm", "run", "start:prod"]


