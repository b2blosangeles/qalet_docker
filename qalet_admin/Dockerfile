FROM ubuntu:19.10

RUN apt update && apt autoremove
RUN apt -y install sudo curl dirmngr apt-transport-https lsb-release ca-certificates
RUN curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
RUN sudo apt -y install nodejs
RUN apt-get -y install git
RUN apt-get install -y cron
RUN apt-get install -y vim

# --- http://ectjs.com/ ---
RUN npm install ect
RUN npm install express
RUN npm install body-parser
RUN npm install compression

RUN echo "* * * * * root sh /var/qalet/admin/localCron/cronScript.sh >> /var/cronScript.sh.log" >> /etc/crontab
ENTRYPOINT /etc/init.d/cron stop &&  cron && cd /var/qalet/admin/ && node index.js

