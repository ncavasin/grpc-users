FROM node:12.13-alpine as development

# Each RUN statement will be executed in this context
WORKDIR /usr/src/app        

# Copy the requirements
COPY package*.json ./

# Install requirements
RUN npm install --only=development

# Copy everything to the container
COPY . .

# Bootstrap it
RUN npm run build

# Prod environ
FROM node:12.13-alpine as production

# Add arguments for switching environments
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]