FROM node:24-bookworm-slim AS build
WORKDIR /app

COPY . .
RUN npm ci
RUN npm run build

FROM node:24-bookworm-slim
WORKDIR /app

ENV HOST=0.0.0.0
ENV PORT=3000

COPY --from=build /app/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]