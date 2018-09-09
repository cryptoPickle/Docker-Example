FROM node:alpine as builder
LABEL maintainer="o-wned@outlook.com"

WORKDIR /usr/app
COPY ./package* .json .
RUN npm install
COPY . .
RUN npm run build


FROM nginx
EXPOSE 80
COPY --from=builder /usr/app/build /usr/share/nginx/html
