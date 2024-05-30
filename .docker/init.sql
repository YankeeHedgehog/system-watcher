-- init.sql

CREATE TABLE my_table (
    id SERIAL PRIMARY KEY,
    data TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM pg_create_logical_replication_slot('my_slot', 'test_decoding');
