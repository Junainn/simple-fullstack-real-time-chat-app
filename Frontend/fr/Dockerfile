FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .




# Build the React app (this is when React will read the .env variables)
RUN npm run build

EXPOSE 5173

CMD ["npm","run","dev"]