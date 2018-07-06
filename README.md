# Collection Manager

+ **Instituição de Ensino:** Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas
+ **Unidade Curricular:** Sistemas Distribuídos
+ **Professora:** Eduarda Rodrigues Monteiro
+ **Semestre:** 2018/1 - Noite
+ **Aluno:** Lucas Bednarek Budelon

**Descrição do Trabalho:** Este trabalho tem como objetivo desenvolver um protocolo de comunicação visando o desenvolvimento de um sistema distribuído para realizar troca de figurinhas de um álbum. 
O trabalho visa aplicar os conceitos de comunicação e modelos de Sistemas Distribuídos. 
Para isso, uma aplicação distribuída foi desenvolvida e documentada de maneira adequada, aplicando os conhecimentos adquiridos na disciplina e além.


## Problema
Em coleções de figurinhas, é comum termos muitos itens repetidos. 
Em contrapartida, várias outras pessoas que também fazem a mesma coleção, tem os itens que precisamos. 
Sendo assim, podemos trocar os itens. No entanto, por vezes é difícil identificar com quem podemos trocar os itens.

## Solução
O sistema implementado tem o objetivo de identificar as trocas e estabelecer uma comunicação entre usuários. 
Através dele, o usuário controla os itens repetidos e os que precisa para completar sua coleção. 
Para isso, foi desenvolvido um sistema, inicialmente com dados mocados, para simular diferentes coleções e usuários.

### Arquitetura do Sistema
O sistema foi projetado pensando em três entidades: Web.Api, Client e Socket.
O Cliente se comunica com a Web.Api para consumir os dados da aplicação e exibir para o usuário.
Atravez do Socket que é feita a comunicação geral da aplicação. Esta entidade é responsável por identificar as possível trocas e comunicar os demais usuários.
O usuário interage com o sistema através do cliente para fazer as operações de troca, chat e etc.
A camada de dados é representada pela Web.Api, reponsável por manter os dados. É consumida pelas outras entidades e recebe instruções para manipulação dos dados.


#### Web.Api (Dados) 
Responsável por gerenciar os dados da aplicação (Usuários, albuns, figurinhas e etc). 
Implementado utilizando .net Core (C#).

#### Client (Interface)
Por meio dessa camada é que o usuário interage com o sistema. 
Visualiza o álbum, os itens, informa seus dados de identificação. 
Implementado utilizando Angular e bootstrap.

#### Socket (Comunicação)
Camada responsável por viabilizar a comunicação entre os usuários e fazer a chamada aos dados para identificar as trocas. 
Servidor implementado em node.js

### Negócio
O usuário pode solicitar a troca das figurinhas para participantes dos grupos que está vinculado ou buscar trocar por localização.
A solicitar trocas, o sistema busca as informações da WebApi e distribui os match’s através do Socket. 
As correspondências (figurinhas que preciso e figurinhas que outros usuários têm repetidas) são carregadas na área de trocas dos outros usuários conectados. 
A partir daí, os usuários na outra ponta, podem trocar ou conversar. 
Caso deseje conversar, um chat é aberto entre os dois usuários, caso queira trocar, a Web.Api é chamada para fazer a troca e após concluída uma mensagem é enviada através do Socket para que os itens (figurinhas) do usuário que solicitou a troca seja atualizada.
O sistema permite que o usuário possua vários álbuns. Cada álbum está vinculado a uma coleção. 
O usuário deve associar se a grupos, para poder fazer suas trocas e conversar o no chat do grupo. 
Cada grupo está vinculado a uma coleção. É possível trocar mensagens no chat do grupo ou mensagens individuais.

## Links Úteis

Template Client: <https://github.com/tiniestory/material-dashboard-angular>
Template Chat: <https://github.com/luixaviles/socket-io-typescript-chat>