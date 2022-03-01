FROM node:14-alpine
WORKDIR /todo-app
EXPOSE 3001
ADD node_modules.tar.gz .
COPY . .
CMD ["npm", "start"]
