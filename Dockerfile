FROM node:14.0-slim
COPY . .
RUN npm run refresh
CMD [ "node", "index.js" ]