FROM cypress/included:13.5.0

RUN npm install -g typescript ts-node

WORKDIR /e2e
COPY . .

ENTRYPOINT ["npx", "cypress", "run"]