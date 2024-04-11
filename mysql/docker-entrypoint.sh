#!/bin/bash

# # Remove existing files in the MySQL data directory
# rm -rf /var/lib/mysql/*

# Altera o proprietário e o grupo do diretório MySQL data para 'mysql'
chown -R mysql:mysql /var/lib/mysql

# Copia os scripts de inicialização para o diretório correto
# Certifique-se de que os scripts estejam no diretório /docker-entrypoint-initdb.d
# e que tenham permissões de execução adequadas
COPY ./mysql-init-scripts/ /docker-entrypoint-initdb.d/
RUN chmod -R 775 /docker-entrypoint-initdb.d

# Executa o entrypoint padrão do MySQL
exec /usr/local/bin/docker-entrypoint.sh "$@"
