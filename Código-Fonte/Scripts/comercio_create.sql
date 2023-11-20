-- DROP TABLE admin;

CREATE TABLE admin
(
    email VARCHAR NOT NULL,
    senha VARCHAR NOT NULL,
    CONSTRAINT pk_admin PRIMARY KEY (email, senha),
);

-- DROP TABLE produto;

CREATE TABLE produto
(
    id SERIAL,
    nome VARCHAR NOT NULL,
    valor FLOAT NOT NULL,
    CONSTRAINT pk_produto PRIMARY KEY (id),
);

-- DROP TABLE clientef;

CREATE TABLE clientef
(
    cpf VARCHAR NOT NULL,
    nome VARCHAR NOT NULL,
    endereco VARCHAR NOT NULL,
    telefone INTEGER,
    CONSTRAINT pk_cliente PRIMARY KEY (cpf),
);

-- DROP TABLE compras;

CREATE TABLE venda
(
    id SERIAL,
    cpfcli VARCHAR NOT NULL,
    dtcompra DATE NOT NULL,
    hrcompra TIME NOT NULL,
    valor FLOAT NOT NULL,
    metpag VARCHAR NOT NULL,
    CONSTRAINT pk_venda PRIMARY KEY (id),
);

INSERT INTO admin (email, senha) VALUES ('administrador@gmail.com', 'sysadmin');

INSERT INTO produto (nome, valor) VALUES ('Barra de Chocolate',  5.40);
INSERT INTO produto (nome, valor) VALUES ('Alvejante', 10.00);

INSERT INTO clientef (cpf, nome, endereco, telefone) VALUES ('123.456.789-12', 'joao', 'rua abc', 123456789);
INSERT INTO clientef (cpf, nome, endereco, telefone) VALUES ('222.543.123-23', 'abelardo', 'rua cde', 123456789);

INSERT INTO venda (cpfcli, dtcompra, hrcompra, valor, metpag) VALUES ('123.456.789-12', now(), now(), '13.22', 'dinheiro');
