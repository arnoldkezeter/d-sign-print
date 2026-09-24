FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Correction des permissions sur les executables node_modules
RUN chmod -R +x node_modules/.bin

EXPOSE 5173

# --host est indispensable pour que Vite ecoute sur toutes les interfaces
# et soit donc joignable depuis l'exterieur du conteneur (port mappe).
CMD ["npm", "run", "dev", "--", "--host"]
