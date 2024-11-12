# Use a imagem oficial do Grafana como base
FROM grafana/grafana:latest

# Troque para o usuário root
USER root

# Opcional: instale outras ferramentas que precise
# RUN apt-get update && apt-get install -y nano sudo

# Defina o diretório de trabalho
WORKDIR /usr/share/grafana

# Exponha a porta 3000
EXPOSE 3000

# Comando para iniciar o Grafana
CMD ["/run.sh"]