FROM node:18-alpine AS build

WORKDIR /app

COPY easy-comm/package*.json ./
RUN npm install

COPY easy-comm/ .
ARG REACT_APP_API_URL
RUN REACT_APP_API_URL=$REACT_APP_API_URL npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/build /app/build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
