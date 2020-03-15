FROM ubuntu:19.10

RUN apt update && apt autoremove
RUN apt -y install sudo curl dirmngr apt-transport-https lsb-release ca-certificates
RUN curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
RUN sudo apt -y install nodejs
RUN apt-get -y install git
RUN apt-get install -y cron
RUN apt-get install -y vim
RUN mkdir -p /var/qalet/cron/
RUN cd  /var/qalet/
COPY qalet_admin/index.js /var/qalet/
COPY qalet_admin/localCron /var/qalet/localCron
RUN echo "* * * * * root sh /var/qalet/localCron/cronScript.sh" >> /crontab
ENTRYPOINT /etc/init.d/cron stop &&  cron

CMD ["node", "/var/qalet/index.js", "FOREGROUND"]
