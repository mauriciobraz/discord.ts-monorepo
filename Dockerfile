# Stage 1: Build the application
FROM node:16-alpine AS builder

ARG APP_SCOPE
ENV APP_SCOPE ${APP_SCOPE}

RUN apk update && apk add --no-cache git libc6-compat

WORKDIR /app
RUN npm install -g turbo

COPY . .
RUN turbo prune --scope=${APP_SCOPE} --docker

# Stage 2: Install dependencies
FROM node:16-alpine AS installer

RUN apk update && apk add --no-cache git libc6-compat
RUN npm install -g pnpm

WORKDIR /app

COPY --from=builder /app/out/full/.gitignore ./.gitignore
COPY --from=builder /app/out/full/turbo.json ./turbo.json
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

RUN pnpm fetch

COPY --from=builder /app/out/full/ .
RUN pnpm install -r --offline --ignore-scripts --frozen-lockfile

# Stage 3: Run the application
FROM node:16-alpine AS sourcer

ARG APP_SCOPE
ENV APP_SCOPE ${APP_SCOPE}

# Uncomment the following lines to pass the TURBO_TEAM and TURBO_TOKEN to enable
# Turbo Remote Caching for doing faster builds.
# https://turbo.build/repo/docs/handbook/deploying-with-docker#remote-caching

# ARG TURBO_TEAM
# ENV TURBO_TEAM $TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN $TURBO_TOKEN

RUN apk update && apk add --no-cache git libc6-compat
RUN npm install -g pnpm

WORKDIR /app

COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore

RUN NODE_ENV=production pnpm turbo run build --scope=${APP_SCOPE} --include-dependencies --no-deps

EXPOSE 3000
CMD pnpm turbo run start --scope=${APP_SCOPE}
