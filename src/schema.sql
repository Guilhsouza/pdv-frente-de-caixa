CREATE DATABASE pdv;

create table usuarios (
  id serial primary key not null,
  nome varchar(100),
  email varchar(100) unique,
  senha varchar(100)
  );
  
create table categorias (
    id serial primary key not null,
    descricao varchar(255)
  );

insert into categorias (descricao) 
values
    ('Informática'),
    ('Celulares'),
    ('Beleza e Perfumaria'),
    ('Mercado'),
    ('Livros e Papelaria'),
    ('Brinquedos'),
    ('Moda'),
    ('Bebê'),
    ('Games');