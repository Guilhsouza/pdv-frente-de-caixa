create table produtos with not exists (
    id serial primary key not null,
    descricao varchar(255),
    quantidade_estoque int,
    valor decimal(10,2),
    categoria_id references categoria(id)
);

create table clientes if not exists (
    id serial primary key not null,
    nome varchar(255),
    email varchar(255) unique,
    cpf varchar(11) unique,
    cep varchar(9),
    rua varchar(255),
    numero smallint,
    bairro varchar(255),
    cidade varchar(255),
    estado varchar(255)
);