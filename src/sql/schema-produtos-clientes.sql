create table if not exists produtos (
    id serial primary key not null,
    descricao varchar(255),
    quantidade_estoque int,
    valor decimal(10,2),
    categoria_id int references categorias(id)
);

create table if not exists clientes (
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