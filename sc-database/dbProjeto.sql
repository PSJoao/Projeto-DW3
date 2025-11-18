CREATE TABLE usuarios (
    usuarioid bigserial constraint pk_usuarios PRIMARY KEY,
    username varchar(10) UNIQUE,
    password text,
    deleted boolean DEFAULT false
);

CREATE TABLE professores
(
    professor_id SERIAL,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    deleted boolean DEFAULT false,
    CONSTRAINT pk_id_professor PRIMARY KEY (professor_id),
    CONSTRAINT un_email_professor UNIQUE (email)
);

CREATE TABLE alunos
(
    aluno_id SERIAL,
    nome VARCHAR(100) NOT NULL,
    matricula VARCHAR(100) NOT NULL,
    datanascimento DATE NOT NULL,
    deleted boolean DEFAULT false,
    CONSTRAINT pk_id_aluno PRIMARY KEY (aluno_id),
    CONSTRAINT un_matricula_aluno UNIQUE (matricula)
);

--1xN
CREATE TABLE disciplinas
(
    disciplina_id SERIAL,
    nome_disciplina VARCHAR(100) NOT NULL,
    codigo_disciplina VARCHAR(100) NOT NULL,
    professor_id INTEGER,
    deleted boolean DEFAULT false,
    CONSTRAINT pk_id_disciplina PRIMARY KEY (disciplina_id),
    CONSTRAINT un_codigo_disciplina UNIQUE (codigo_disciplina),
    CONSTRAINT fk_id_professor FOREIGN KEY (professor_id) REFERENCES professores
);

--NxN
CREATE TABLE alunos_disciplinas
(
    aluno_id INTEGER,
    disciplina_id INTEGER,
    deleted boolean DEFAULT false,
    CONSTRAINT pk_id_aluno_disciplina PRIMARY KEY (aluno_id, disciplina_id),
    CONSTRAINT fk_id_aluno FOREIGN KEY (aluno_id) REFERENCES alunos,
    CONSTRAINT fk_id_disciplina FOREIGN KEY (disciplina_id) REFERENCES disciplinas
);