FROM php:7.2.0-fpm-alpine3.6

LABEL maintainer="https://gitlab.com/nijipico/sticker_migrator" \
      description="Sticker Migrator from LINE to Telegram"

ENV NODE_ENV=production \
    COMPOSER_ALLOW_SUPERUSER=true

EXPOSE 8080

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
    freetype \
    libpng \
    libjpeg-turbo \
    freetype-dev \
    libpng-dev \
    libjpeg-turbo-dev \
 && docker-php-ext-configure gd \
    --with-gd \
    --with-freetype-dir=/usr/include/ \
    --with-png-dir=/usr/include/ \
    --with-jpeg-dir=/usr/include/ \
 && NPROC=$(grep -c ^processor /proc/cpuinfo 2>/dev/null || 1) \
 && docker-php-ext-install -j${NPROC} \
    pdo \
    pdo_mysql \
    mbstring \
    tokenizer \
    xml \
    gd \
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
COPY . /smigrator

RUN mkdir -p /smigrator/storage /smigrator/bootstrap/cache \
 && chmod -R 777 /smigrator/storage /smigrator/bootstrap/cache \
 && chmod +x /usr/local/bin/composer; sync \
 && yarn cache clean

VOLUME ["/smigrator"]

CMD ["supervisord"]
