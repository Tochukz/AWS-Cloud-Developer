FROM node:20.19.5-alpine3.22

# Set working directory inside container
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "bin/www"]
