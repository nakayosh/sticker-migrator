FROM php:7.2.0-fpm-alpine3.6

LABEL maintainer="https://gitlab.com/nijipico/sticker_migrator" \
      description="Sticker Migrator from LINE to Telegram"

ENV NODE_ENV=production \
    COMPOSER_ALLOW_SUPERUSER=true

EXPOSE 3000 4000

WORKDIR /smigrator

RUN apk -U upgrade \
 && apk add \
    curl \
    git \
    nginx \
    nodejs \
    nodejs-npm \
    yarn \
    build-base \
    libmemcached-dev \
    libmcrypt-dev \
    libxml2-dev \
    zlib-dev \
    autoconf \
    cyrus-sasl-dev \
    libgsasl-dev \
    supervisor \
 && docker-php-ext-install \
    pdo \
    pdo_mysql \
    mbstring \
    tokenizer \
    xml \
 && pecl channel-update pecl.php.net \
 && pecl install memcached \
 && docker-php-ext-enable memcached \
 && npm install -g laravel-echo-server \
 && mkdir -p /var/log/nginx /var/log/supervisor \
 && rm -rf /var/cache/apk/*

COPY ./composer.phar /usr/local/bin/composer
COPY ./installation/php.ini /usr/local/etc/php/php.ini
COPY ./installation/nginx.conf /etc/nginx/nginx.conf
COPY ./installation/zzz-www.conf /usr/local/etc/php-fpm.d
COPY ./installation/supervisord.conf /etc/supervisord.conf
COPY . /smigrator

RUN mkdir -p /smigrator/storage /smigrator/bootstrap/cache \
 && chmod -R 777 /smigrator/storage /smigrator/bootstrap/cache \
 && chmod +x /usr/local/bin/composer; sync

VOLUME /smigrator

CMD ["supervisord"]
