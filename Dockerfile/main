FROM ubuntu:19.10

RUN apt update && apt autoremove
# RUN apt -y install sudo curl dirmngr apt-transport-https lsb-release ca-certificates
# RUN curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
# RUN sudo apt -y install nodejs
RUN apt-get -y install git
RUN apt-get install -y cron

COPY cron.sh /var/qalet_master_cron/

RUN (crontab -l ; echo "* * * * * sh /var/qalet_master_cron/cron.sh >> /var/qalet/cron.log") | crontab
ENTRYPOINT /etc/init.d/cron stop && touch /var/log/cron.log && cron && tail -f /var/log/cron.log && echo "Load ubuntu ..."
