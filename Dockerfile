From node:18

RUN npm install -g pm2
RUN mkdir -p /home/app

COPY  . /home/app

EXPOSE 3000

# Inicia la aplicación con PM2
CMD ["pm2-runtime", "/home/app/points.js"]





