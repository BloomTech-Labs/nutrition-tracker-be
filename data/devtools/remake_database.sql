-- command to run the script in terminal
-- psql -U postgres -a -f remake_database.sql

-- powershell (as admin) command to restart postgres service:
-- Restart-Service -Name postgresql-x64-12

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
  CONNECTION LIMIT = -1
;