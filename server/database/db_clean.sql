use CPSC471;

--https://www.basedash.com/blog/how-to-truncate-all-tables-in-mysql
SELECT CONCAT('TRUNCATE TABLE ', TABLE_NAME, ';')
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'CPSC471';