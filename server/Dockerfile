FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Correction des permissions sur les executables node_modules
RUN chmod -R +x node_modules/.bin

EXPOSE 5000

CMD ["npm", "run", "dev"]
