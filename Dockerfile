FROM node:18-alpine AS build

WORKDIR /app

COPY easy-comm/package*.json ./

RUN npm install

COPY easy-comm/ .

ARG REACT_APP_API_URL
RUN REACT_APP_API_URL=$REACT_APP_API_URL npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
