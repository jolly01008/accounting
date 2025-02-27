FROM node:20
LABEL jo="<jollgmll292@gmail.com>"
RUN apt-get update
WORKDIR /app/side-project/accounting-project
COPY package*json ./
RUN npm install && npm install -g nodemon
COPY . .
EXPOSE 3001
CMD ["npm","run","dev"]
