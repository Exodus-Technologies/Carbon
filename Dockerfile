FROM node:14.0-slim
COPY . .
RUN npm run refresh
EXPOSE 19000
CMD [ "node", "index.js" ]