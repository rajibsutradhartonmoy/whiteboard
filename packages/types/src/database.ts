// Supported database types
export type DatabaseType =
  | "postgresql"
  | "mysql"
  | "mariadb"
  | "sqlite"
  | "sqlserver"
  | "oracle"
  | "mongodb"
  | "dynamodb"
  | "firestore"
  | "redis"
  | "cassandra"
  | "couchdb"
  | "neo4j";

export type SqlDatabaseType =
  | "postgresql"
  | "mysql"
  | "mariadb"
  | "sqlite"
  | "sqlserver"
  | "oracle";

export type NoSqlDatabaseType =
  | "mongodb"
  | "dynamodb"
  | "firestore"
  | "redis"
  | "cassandra"
  | "couchdb"
  | "neo4j";

// PostgreSQL specific types
export type PostgresDataType =
  | "bigint"
  | "bigserial"
  | "bit"
  | "bit varying"
  | "boolean"
  | "box"
  | "bytea"
  | "character"
  | "character varying"
  | "cidr"
  | "circle"
  | "date"
  | "double precision"
  | "inet"
  | "integer"
  | "interval"
  | "json"
  | "jsonb"
  | "line"
  | "lseg"
  | "macaddr"
  | "macaddr8"
  | "money"
  | "numeric"
  | "path"
  | "pg_lsn"
  | "pg_snapshot"
  | "point"
  | "polygon"
  | "real"
  | "smallint"
  | "smallserial"
  | "serial"
  | "text"
  | "time"
  | "time with time zone"
  | "timestamp"
  | "timestamp with time zone"
  | "tsquery"
  | "tsvector"
  | "txid_snapshot"
  | "uuid"
  | "xml";

// MySQL specific types
export type MySqlDataType =
  | "tinyint"
  | "smallint"
  | "mediumint"
  | "int"
  | "bigint"
  | "decimal"
  | "float"
  | "double"
  | "bit"
  | "char"
  | "varchar"
  | "binary"
  | "varbinary"
  | "tinyblob"
  | "blob"
  | "mediumblob"
  | "longblob"
  | "tinytext"
  | "text"
  | "mediumtext"
  | "longtext"
  | "enum"
  | "set"
  | "date"
  | "datetime"
  | "timestamp"
  | "time"
  | "year"
  | "geometry"
  | "point"
  | "linestring"
  | "polygon"
  | "json";

// SQLite specific types
export type SqliteDataType =
  | "integer"
  | "real"
  | "text"
  | "blob"
  | "numeric";

// SQL Server specific types
export type SqlServerDataType =
  | "bigint"
  | "binary"
  | "bit"
  | "char"
  | "date"
  | "datetime"
  | "datetime2"
  | "datetimeoffset"
  | "decimal"
  | "float"
  | "geography"
  | "geometry"
  | "hierarchyid"
  | "image"
  | "int"
  | "money"
  | "nchar"
  | "ntext"
  | "numeric"
  | "nvarchar"
  | "real"
  | "smalldatetime"
  | "smallint"
  | "smallmoney"
  | "sql_variant"
  | "text"
  | "time"
  | "tinyint"
  | "uniqueidentifier"
  | "varbinary"
  | "varchar"
  | "xml";

// Generic data type (for UI)
export type GenericDataType =
  | "string"
  | "number"
  | "boolean"
  | "date"
  | "datetime"
  | "time"
  | "uuid"
  | "json"
  | "binary"
  | "array"
  | "enum"
  | "custom";

// Index types
export type IndexType =
  | "btree"
  | "hash"
  | "gist"
  | "spgist"
  | "gin"
  | "brin"
  | "fulltext"
  | "spatial";

// Referential actions
export type ReferentialAction =
  | "NO ACTION"
  | "RESTRICT"
  | "CASCADE"
  | "SET NULL"
  | "SET DEFAULT";

// Constraint types
export type ConstraintType =
  | "primary_key"
  | "foreign_key"
  | "unique"
  | "check"
  | "not_null"
  | "default"
  | "exclude";
