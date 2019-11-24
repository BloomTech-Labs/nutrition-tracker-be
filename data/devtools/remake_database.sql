

  DROP DATABASE IF EXISTS nutrition_tracker;

 

  DROP ROLE IF EXISTS nutrition_tracker;

 

  CREATE ROLE nutrition_tracker
  WITH 
    LOGIN
    PASSWORD 'testpass'
    CREATEDB 
    NOSUPERUSER
    NOCREATEROLE
  ;

 

  CREATE DATABASE nutrition_tracker
    WITH 
    OWNER = nutrition_tracker
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

