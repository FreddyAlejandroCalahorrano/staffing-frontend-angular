#FROM bancopichinchaec.azurecr.io/common-pipeline-template/nginx:1.19.6-alpine
#COPY ./build/ /usr/share/nginx/html/

FROM nginx
COPY ./dist/ /usr/share/nginx/html