create table if not exists pedidos (
    id serial primary key unique not null,
    cliente_id int references clientes(id) not null,
    observacao varchar(255),
    valor_total int
);

alter table produtos 
add column produto_imagem text; 

create table if not exists pedido_produtos (
    id serial primary key unique not null,
    pedido_id int references pedidos(id),
    produto_id int references produtos(id),
    quantidade_produto int,
    valor_produto int
);