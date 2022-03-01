FROM mjgargani/puppeteer:trybe1.0
# workdir - diretório de trabalho que será utilizado como base para a execução dos comandos
# quando o containe rodar além de criar essa pasta vai entrar nela.
WORKDIR /todo-app
# add - descompacta um arquivo e adiciona em algum lugar
# o primeiro parametro é arquivo a ser adcionado e descompactado
# o segundo parametro é o local onde o arquivo será adicionado
ADD node_modules.tar.gz .
# copy -  copia diretórios e arquivos para dentro da nossa imagem
# o primeiro parametro é o arquivo ou diretório
# o segundo parametro é o destino (a imagem, endereço de onde a imagem está)
COPY . .
# cmd - sempre é executado quando o container é iniciado
# o primeiro argumento é o executável e os demais são seus parâmetros.
CMD ["npm", "test"]