FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Copy over package.json file(s)
COPY package*.json ./

# Install app dependencies
RUN npm run refresh

# Copy over app files
COPY . .

# Expose PORT
EXPOSE 8081

# Start application
CMD [ "node", "index.js" ]