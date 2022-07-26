import { CartMemoryDAO } from '../../persistence/cartsDAO/cart';
import { cartFSDAO } from '../../persistence/cartsDAO/cartFS';
import { CartMongoDAO } from '../../persistence/cartsDAO/cartMongo';
import { CartSQLDAO } from '../../persistence/cartsDAO/cartSQL';
import { CartSQLiteDAO } from '../../persistence/cartsDAO/cartSQLite';
import { CartFirebaseDAo } from '../../persistence/cartsDAO/cartFB';
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

export class FactoryCartDAO {
  static get(tipo: TipoPersistencia) {
    switch (tipo) {
      case TipoPersistencia.FileSystem:
        console.log('RETORNANDO INSTANCIA CLASE FS');
        const filePath = path.resolve(__dirname, './../persistence/productsDAO/products.json');
        console.log(filePath);
        return new cartFSDAO(filePath);

      case TipoPersistencia.MongoAtlas:
        console.log('RETORNANDO INSTANCIA CLASE MONGO ATLAS');
        return new CartMongoDAO();

      case TipoPersistencia.LocalMongo:
        console.log('RETORNANDO INSTANCIA CLASE MONGO LOCAL');
        return new CartMongoDAO(true);

      case TipoPersistencia.Firebase:
        console.log('RETORNANDO INSTANCIA CLASE FIREBASE');
        return new CartFirebaseDAo();
      
      case TipoPersistencia.MYSQL:
        return new CartSQLDAO();

      case TipoPersistencia.SQLITE3:
        return new CartSQLiteDAO();

      default:
        console.log('RETORNANDO INSTANCIA CLASE MEMORIA');
        return new CartMemoryDAO();
    }
  }
}