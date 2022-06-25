FROM node:14-alpine
WORKDIR /opt/app
COPY . /opt/app
RUN npm install 
ARG ENV
ENV NODE_ENV :$ENV
RUN npm run build:$ENV
RUN npm prune --production
EXPOSE 3000
CMD ["npm", "start"]
