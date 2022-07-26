import { ProductsDAOMemory } from '../../persistence/productsDAO/memory';
import { ProductosFSDAO } from '../../persistence/productsDAO/fs';
import { ProductsMongoDAO } from '../../persistence/productsDAO/mongo';
import { FirestoreDAO } from '../../persistence/productsDAO/firebase';
import { ProductsSQLDAO } from '../../persistence/productsDAO/mysql';
import { ProductsSQLiteDAO } from '../../persistence/productsDAO/sqlite3';
import path from 'path';

export enum TipoPersistencia {
  Memoria = 'MEM',
  FileSystem = 'FS',
  MYSQL = 'MYSQL',
  SQLITE3 = 'SQLITE3',
  LocalMongo = 'LOCAL-MONGO',
  MongoAtlas = 'MONGO-ATLAS',
  Firebase = 'FIREBASE',
}

export class FactoryDAO {
  static get(tipo: TipoPersistencia) {
    switch (tipo) {
      case TipoPersistencia.FileSystem:
        console.log('RETORNANDO INSTANCIA CLASE FS');
        const filePath = path.resolve(__dirname, './../persistence/productsDAO/products.json');
        console.log(filePath);
        return new ProductosFSDAO(filePath);

      case TipoPersistencia.MongoAtlas:
        console.log('RETORNANDO INSTANCIA CLASE MONGO ATLAS');
        return new ProductsMongoDAO();

      case TipoPersistencia.LocalMongo:
        console.log('RETORNANDO INSTANCIA CLASE MONGO LOCAL');
        return new ProductsMongoDAO(true);

      case TipoPersistencia.Firebase:
        console.log('RETORNANDO INSTANCIA CLASE FIREBASE');
        return new FirestoreDAO();
      
      case TipoPersistencia.MYSQL:
        return new ProductsSQLDAO();

      case TipoPersistencia.SQLITE3:
        return new ProductsSQLiteDAO();

      default:
        console.log('RETORNANDO INSTANCIA CLASE MEMORIA');
        return new ProductsDAOMemory();
    }
  }
}