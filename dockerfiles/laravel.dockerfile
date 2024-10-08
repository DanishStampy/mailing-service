FROM php:latest

WORKDIR /app

ENV COMPOSER_ALLOW_SUPERUSER=1
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libxml2-dev \
    libonig-dev \
    libicu-dev \
    libxslt-dev \
    zlib1g-dev \
    libzip-dev \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql sockets gd calendar intl exif zip

RUN curl -sS https://getcomposer.org/installer | php -- \
     --install-dir=/usr/local/bin --filename=composer

COPY .. .

RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs
