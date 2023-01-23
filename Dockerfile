# Stage 1 - the build process
FROM public.ecr.aws/b7h8q0t5/nodejs16 as BUILD

WORKDIR /build

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# Stage 2 - the production environment
FROM public.ecr.aws/b7h8q0t5/nodejs16

WORKDIR /app

COPY --from=BUILD /build/package.json .
COPY --from=BUILD /build/dist ./dist
COPY --from=BUILD /build/.env ./.env
COPY --from=BUILD /build/node_modules ./node_modules

ENV NODE_ENV=production

CMD ["npm", "run", "start:prod"]


