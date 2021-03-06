# chico
Repositório onde estou aprendendo como desenvolver um bot para o discord.

## Requisitos:
  - node.js
  
## Quando começar um bot novo
  - Iniciar a pasta com o node

```  
$ npm init
$ npm install discord.js
$ npm install natural
$ criar o Application.js  
```  

  - iniciar o desenvolvimento com typescript

```
$ npm install -g typescript
$ tsc --init  
```  

  - módulos node instalados:

```
$ npm install -g typescript
$ npm install --save @types/node   // provê tipos para o node
$ npm install discord.js
$ npm install yargs --save               // processa linha de comandos
$ npm i @types/yargs --save-dev 
```


## Para clonar esse bot
```
$ git clone https://github.com/smarcelobr/chico
$ npm install
```
## Link para adicionar o bot no seu canal do discord

https://discordapp.com/oauth2/authorize?client_id=738863390167924808&scope=bot&permissions=515136

## Executar o BOT

Verifique se o token está em conf/config.json. Se o arquivo não existir, crie um com o conteúdo
abaixo:

```
{
  "token": "pegue o token em https://discord.com/developers/applications"
}
```

Execute o node:

```
$ node .
```

Execute com typescript

```
$ tsc -w -p .
```

### Carregando os fontes automaticamente

Em modo desenvolvimento, pode ser util usar o `nodemon`, pois, ele 
carrega automaticamente as alterações do código-fonte.

```
nodemon Application.js
```

## Referências

- Youtube: [COMO CRIAR UM BOT NO DISCORD \[MODO EASY!!!\]](https://www.youtube.com/watch?v=L2QgVT-I67w)
- Natural: https://medium.com/better-programming/natural-language-processing-with-node-js-afb62729c1a2
