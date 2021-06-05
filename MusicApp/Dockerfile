FROM node:7.10 as frontend-build
RUN mkdir -p /usr/src/app
EXPOSE 8006
WORKDIR /usr/src/app
COPY dist /usr/src/app/dist
RUN npm install -g http-server
CMD ["http-server","dist/MusicApp", "--port=8006"]