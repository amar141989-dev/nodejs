FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN apk add openssl3
RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev
COPY . .
RUN npx prisma generate
EXPOSE 3000
CMD [ "node", "index.js" ]

#  docker build -t demo:1.0.0 .
#  docker run -p 3000:3000 -e DATABASE_HOST=host.docker.internal demo:1.0.0 #Value from .env is gets overridendock
#  docker exec -it container_id /bin/sh