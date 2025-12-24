
# FROM php:8.2-cli

# RUN apt-get update && apt-get install -y     git curl unzip libzip-dev     && docker-php-ext-install pdo pdo_mysql zip

# COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# WORKDIR /var/www

# CMD php artisan serve --host=0.0.0.0 --port=8000


FROM php:8.4-cli

RUN apt-get update && apt-get install -y \
    git unzip curl libzip-dev netcat-openbsd \
    && docker-php-ext-install pdo pdo_mysql zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

CMD bash -c "until nc -z db 3306; do sleep 1; done && php artisan serve --host=0.0.0.0 --port=8000"
