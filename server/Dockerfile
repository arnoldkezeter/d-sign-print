FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Correction des permissions sur les executables node_modules
RUN chmod -R +x node_modules/.bin

EXPOSE 5000

# En dev, ./server/src est monte en volume par docker-compose : tsx watch
# recharge automatiquement a chaque modification, sans rebuild d'image.
CMD ["npm", "run", "dev"]
