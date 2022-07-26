import {
    ProductI,
    ProductQuery,
} from '../../models/productsInterfaces';
import knex from 'knex';
import Config from '../../config/config';
import generateRandomString from '../../utils/generateCode';

export class CartSQLDAO {
    private cart : any;
    constructor() {
        this.cart = knex({
            client: 'mysql',
            connection: {
              host: '127.0.0.1',
              user: `${Config.MYSQL_LOCAL_USER}`,
              password: `${Config.MYSQL_LOCAL_PASSWORD}`,
              database: `${Config.MYSQL_LOCAL_DBNAME}`,
            }
        });

        this.cart.schema.hasTable('cart').then((exists : any) => {
            if (!exists) {
              console.log('NO EXISTE LA TABLA productos. VAMOS A CREARLA');
              this.cart.schema
                .createTable('productos', (productosTable : any) => {
                  productosTable.increments();
                  productosTable.string('idCart').defaultTo(generateRandomString(7));
                  productosTable.string('_id').notNullable();
                  productosTable.string('name').notNullable();
                  productosTable.string('description').notNullable();
                  productosTable.integer('stock').notNullable();
                  productosTable.decimal('price', 8, 2);
                  productosTable.timestamp('created_at').defaultTo(Date.now())
                })
                .then(() => {
                  console.log('DONE');
                });
            }
        });
    }

    
    async get(_id?: string): Promise<ProductI[]> {
        if(_id) {
            return this.cart.from('cart').where({ _id: _id }).select();
        }

        return this.cart.from('cart').select();
    }


    async add(data: ProductI): Promise<ProductI>  {
        return this.cart('cart').insert(data);
    }
    


    async delete(_id: string) : Promise<void> {
        return this.cart.from('cart').where({ _id }).del();
    }


}