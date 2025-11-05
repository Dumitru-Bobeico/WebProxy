CREATE KEYSPACE IF NOT EXISTS userdb
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE userdb;

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    name text,
    email text
);

