import dotenv from 'dotenv';
dotenv.config();

const venv = {
  PORT: process.env.PORT || 8080,
  MONGO_ATLAS_USER: process.env.MONGO_ATLAS_USER || 'user',
  MONGO_ATLAS_PASSWORD: process.env.MONGO_ATLAS_PASSWORD || 'pasw',
  MONGO_ATLAS_CLUSTER: process.env.MONGO_ATLAS_CLUSTER || 'clusterUrl',
  MONGO_ATLAS_DBNAME: process.env.MONGO_ATLAS_DBNAME || 'dbName',
  MONGO_LOCAL_DBNAME: process.env.MONGO_LOCAL_DBNAME || 'dbNameLocal',
  MYSQL_LOCAL_DBNAME: process.env.MYSQL_LOCAL_DBNAME || 'dbNameLocal',
  MYSQL_LOCAL_USER : process.env.MYSQL_LOCAL_USER || 'user',
  MYSQL_LOCAL_PASSWORD : process.env.MYSQL_LOCAL_PASSWORD || 'psw',
};

export default venv;