# Usando Node.js como base
FROM node:18

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos do backend
COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Expor a porta da API
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "server.js"]
