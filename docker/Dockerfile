FROM mhart/alpine-node:16

ENV   HOST 0.0.0.0
ENV   PORT 8000
ENV   CRON_IN_DOCKER true
ENV   CRON_PATH /etc/crontabs

RUN   mkdir /cronos; touch $CRON_PATH/root; chmod +x $CRON_PATH/root

WORKDIR /cronos

LABEL description "Cronos"

RUN   apk --no-cache add \
      vim \
      bash \
      wget \
      curl \
      supervisor

EXPOSE $PORT

CMD ["supervisord", "-c", "/etc/supervisord.conf"]
