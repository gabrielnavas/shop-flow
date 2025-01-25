- Casos de usos por tela

## Login
### Logar por token JWT
O usuário receberá um token JWT que será utilizado para identificar ele por todo o sistema.

## Cadastro
### Cadastrar usuário
O usuário conseguira fazer um cadastro tendo a permissão de CONSUMER inicialmente.

## Produtos
### Obter produtos
O usuário conseguira ver todos os produtos disponíveis para comprar.

### Ver produto
O usuário conseguira ver detalhes daquele produto e a foto em maior escala.

### Adicionar produto no carrinho
Adicionar no carrinho de compras da loja para posterior gerenciar a quantidade e finalizar a compra.

## Carrinho
### Obter itens do carrinho
Listar todos os produtos que o usuário adicionou no carrinho.

### Incrementar quantidade de um item
Aumentar a quantidade de um produto até um certo limite.

### Decrementar quantidade de um item
Diminuir a quantidade de um produto sendo limitado até um.

### Remover item do carrinho
Remover um produto do carrinho. Será possível adicionar indo na tela de produtos novamente.

### Gerar ordem
Será finalizado a compra e a ordem poderá ser vista na tela de ordens de compra. O usuário ficará livre para gerar outra ordem.

## Ordens
- Obter ordens
- Cancelar uma ordem se o status for pendente.
- Atualizar em tempo real o status de uma ordem.
- Mudar o status da ordem, caso o usuário for ADMIN.

## Itens de uma Ordem
- Obter itens da ordem.