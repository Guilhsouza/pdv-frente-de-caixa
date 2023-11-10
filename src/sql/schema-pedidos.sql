create table if not exists pedidos (
    id serial primary key unique required,
    cliente_id int references clientes(id) required,
    observacao varchar(255),
    valor_total int
);

alter table produtos 
add column produto_imagem text; 

create table if not exists pedido_produtos (
    id serial primary key unique required,
    pedido_id int references pedidos(id),
    produto_id int references produtos(id),
    quantidade_produto int,
    valor_produto int
);