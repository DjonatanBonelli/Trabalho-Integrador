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
    idp SERIAL,
    ncm INTEGER NOT NULL,
    nomep VARCHAR NOT NULL,
    valorp FLOAT NOT NULL,
    UNIQUE(nomep, ncm),
    CONSTRAINT pk_produto PRIMARY KEY (idp),
);

-- DROP TABLE clientef;

CREATE TABLE clientef
(
    cpf VARCHAR NOT NULL,
    nomecf VARCHAR NOT NULL,
    enderecocf VARCHAR NOT NULL,
    telefonecf INTEGER,
    CONSTRAINT pk_clientef PRIMARY KEY (cpf),
);

CREATE TABLE clientej
(
    cnpjc VARCHAR NOT NULL,
    inesc VARCHAR not null
    nomecj VARCHAR NOT NULL,
    enderecocj VARCHAR NOT NULL,
    telefonecj INTEGER,
    UNIQUE (inesc)
    CONSTRAINT pk_clientej PRIMARY KEY (cnpjc),
);

CREATE TABLE fornecedor
(
    cnpjf VARCHAR NOT NULL,
    inesf VARCHAR not null
    nomef VARCHAR NOT NULL,
    enderecof VARCHAR NOT NULL,
    telefonef INTEGER,
    UNIQUE (inesc)
    CONSTRAINT pk_fornecedor PRIMARY KEY (cnpjf),
);

-- DROP TABLE compras;

CREATE TABLE venda
(
    nomecli VARCHAR NULL,
    dtvenda DATE NOT NULL,
    hrvenda TIME NOT NULL,  
    valorv FLOAT NOT NULL,
    metpagv VARCHAR NOT NULL,
    CONSTRAINT pk_venda PRIMARY KEY (nomecli, dtvenda, hrvenda),
);

CREATE TABLE compra
(
    cnpjf VARCHAR NOT NULL,
    dtcompra DATE NOT NULL,
    hrcompra TIME NOT NULL,  
    valorc FLOAT NOT NULL,
    metpagc VARCHAR NOT NULL,
    CONSTRAINT pk_compra PRIMARY KEY (cnpjf, dtcompra, hrcompra),
);

CREATE TABLE licitacao
(
    cnpjcli VARCHAR NOT NULL,
    dtlic DATE NOT NULL,
    hrlic TIME NOT NULL,  
    valorl FLOAT NOT NULL,
    metpagl VARCHAR NOT NULL,
    CONSTRAINT pk_licitacao PRIMARY KEY (cnpjcli, dtlic, hrlic),
);


INSERT INTO admin (email, senha) VALUES ('administrador@gmail.com', 'sysadmin');

INSERT INTO produto (nome, valor) VALUES ('Barra de Chocolate',  5.40);
INSERT INTO produto (nome, valor) VALUES ('Alvejante', 10.00);

INSERT INTO clientef (cpf, nome, endereco, telefone) VALUES ('123.456.789-12', 'joao', 'rua abc', 123456789);
INSERT INTO clientef (cpf, nome, endereco, telefone) VALUES ('222.543.123-23', 'abelardo', 'rua cde', 123456789);

INSERT INTO venda (cpfcli, dtcompra, hrcompra, valor, metpag) VALUES ('123.456.789-12', now(), now(), '13.22', 'dinheiro');
