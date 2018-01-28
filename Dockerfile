FROM php:7.2.0-fpm-alpine3.6

LABEL maintainer="https://gitlab.com/nijipico/sticker_migrater" \
      description="Sticker Migrater from LINE to Telegram"

ENV NODE_ENV=production

EXPOSE 8080

WORKDIR /smigrater

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
 && mkdir -p /var/log/nginx /var/log/supervisor \
 && rm -rf /var/cache/apk/*

COPY ./composer.phar /usr/local/bin/composer
COPY ./installation/php.ini /usr/local/etc/php/php.ini
COPY ./installation/nginx.conf /etc/nginx/nginx.conf
COPY ./installation/zzz-www.conf /usr/local/etc/php-fpm.d
COPY ./installation/supervisord.conf /etc/supervisord.conf
COPY . /smigrater

RUN mkdir -p /smigrater/storage /smigrater/bootstrap/cache \
 && chmod -R 777 /smigrater/storage /smigrater/bootstrap/cache \
 && chmod +x /usr/local/bin/composer; sync \
 && yarn cache clean

VOLUME ["/smigrater"]

CMD ["supervisord"]
