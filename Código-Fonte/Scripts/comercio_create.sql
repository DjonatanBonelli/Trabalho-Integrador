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
    nomep VARCHAR NOT NULL,
    valorp FLOAT NOT NULL,
    UNIQUE(nomep),
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
    inscestc VARCHAR not null
    nomecj VARCHAR NOT NULL,
    enderecocj VARCHAR NOT NULL,
    telefonecj INTEGER,
    CONSTRAINT pk_clientej PRIMARY KEY (cnpjc),
);

CREATE TABLE fornecedor
(
    cnpjf VARCHAR NOT NULL,
    inscestf VARCHAR not null
    nomef VARCHAR NOT NULL,
    enderecof VARCHAR NOT NULL,
    telefonef INTEGER,
    CONSTRAINT pk_fornecedor PRIMARY KEY (cnpjf),
);

-- DROP TABLE compras;

CREATE TABLE venda
(
    idv SERIAL,
    cpfcli VARCHAR NOT NULL,
    dtvenda DATE NOT NULL,
    hrvenda TIME NOT NULL,  
    valorv FLOAT NOT NULL,
    metpagv VARCHAR NOT NULL,
    CONSTRAINT pk_venda PRIMARY KEY (idv),
);

CREATE TABLE compra
(
    idc SERIAL,
    cpfforn VARCHAR NOT NULL,
    dtcompra DATE NOT NULL,
    hrcompra TIME NOT NULL,  
    valorc FLOAT NOT NULL,
    metpagc VARCHAR NOT NULL,
    CONSTRAINT pk_compra PRIMARY KEY (idc),
);

CREATE TABLE licitacao
(
    idl SERIAL,
    cnpjcli VARCHAR NOT NULL,
    dtlic DATE NOT NULL,
    hrlic TIME NOT NULL,  
    valorl FLOAT NOT NULL,
    metpagl VARCHAR NOT NULL,
    CONSTRAINT pk_licitacao PRIMARY KEY (idl),
);


INSERT INTO admin (email, senha) VALUES ('administrador@gmail.com', 'sysadmin');

INSERT INTO produto (nome, valor) VALUES ('Barra de Chocolate',  5.40);
INSERT INTO produto (nome, valor) VALUES ('Alvejante', 10.00);

INSERT INTO clientef (cpf, nome, endereco, telefone) VALUES ('123.456.789-12', 'joao', 'rua abc', 123456789);
INSERT INTO clientef (cpf, nome, endereco, telefone) VALUES ('222.543.123-23', 'abelardo', 'rua cde', 123456789);

INSERT INTO venda (cpfcli, dtcompra, hrcompra, valor, metpag) VALUES ('123.456.789-12', now(), now(), '13.22', 'dinheiro');
