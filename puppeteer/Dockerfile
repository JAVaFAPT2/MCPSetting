FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npx playwright install --with-deps
CMD ["node", "index.js"]
