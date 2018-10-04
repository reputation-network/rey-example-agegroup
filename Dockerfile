FROM node:8-alpine

RUN apk add --no-cache git python make g++
RUN yarn global add foreman

WORKDIR /app
COPY --from=reputationnetwork/gatekeeper /app /gatekeeper

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production

COPY . .

ENV APP_PORT=9000
ENV TARGET_APP_URL http://localhost:$APP_PORT

RUN touch Procfile
RUN echo "gatekeeper: cd /gatekeeper && node src/server.js" >> Procfile
RUN echo "app: PORT=$APP_PORT node index.js" >> Procfile

CMD ["nf", "start"]
