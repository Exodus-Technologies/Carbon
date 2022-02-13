# Carbon
Microservice for all interactions for login, signup of users and verifying JWT tokens for Sheen magazine(Authentication Manager)

# Requirements

For development, you will only need Node.js and a node global package (NPM) installed in your
environement.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer. Also, be
  sure to have `git` available in your PATH, `npm` might need it (You can find git
  [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the
  [official Node.js website](https://nodejs.org/) and the
  [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v14.5.0

    $ npm --version
    6.14.6

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following
command, just open again the command line and be happy.

    $ npm install npm -g

###

---

# Install

    $ git clone https://github.com/Exodus-Technologies/Carbon.git
    $ cd Carbon
    $ npm install

# Configure app

Carbon utilizes dotenv[https://github.com/motdotla/dotenv] for environment variable configuration.

- NODE_ENV (node environment)
- PORT (application port)
- HOST (hostname for application)
- MONGODB_URL (mongo db url for connection)
- COLLECTION_NAME (collection name for users)
- API_KEY (Vonage API key)
- API_SECRET (Vonage API Secret)

# Authenication

Carbon utilizes opentok-jwt[https://www.npmjs.com/package/opentok-jwt] for creating and validation JWT tokens.

# API Definition

Carbon utilizes Swagger and OpenAPI 3.0.3 Specification [https://swagger.io/specification/] for
documentation of APIs.

    ${HOST}:${PORT}/auth-service/v1/swagger/docs

Navigate to link above to see API Definitions.

# Running the project (development mode)

Carbon utilizes nodemon [https://www.npmjs.com/package/nodemon] auto-restart of server after
changes and edits.

    $ npm run serve:dev

See `package.json` for description of task.

# Start application (production mode)

    $ npm start

# Deployment (Docker and Amazon Kubernetes or EKS)

Coming Soon...
