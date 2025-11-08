FROM node:20 AS test
WORKDIR /usr/src/app
COPY . .
RUN npm ci --include=dev
RUN npm test

FROM test AS build
ENV VITE_BACKEND_URL "http://localhost:3000"
RUN npm run build

FROM nginx
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
