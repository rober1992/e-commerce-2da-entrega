import {
    newProductI,
    ProductI,
    ProductQuery,
} from '../../models/productsInterfaces';
import knex from 'knex';
import generateRandomString from '../../utils/generateCode';

export class ProductsSQLiteDAO  {
    private productos : any;
    constructor() {
        this.productos = knex({
            client: 'sqlite3',
            connection: { filename: './midbligera.sqlite' },
            useNullAsDefault: true,
        });

        this.productos.schema.hasTable('productos').then((exists : any) => {
            if (!exists) {
              console.log('NO EXISTE LA TABLA productos. VAMOS A CREARLA');
              this.productos.schema
                .createTable('productos', (productosTable : any) => {
                  productosTable.increments();
                  productosTable.string('_id').defaultTo(generateRandomString(7));
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

    
    async get(id?: string): Promise<ProductI[]> {
        if(id) {
            return this.productos.from('productos').where({ id: id }).select();
        }

        return this.productos.from('productos').select();
    }


    async add(data: newProductI): Promise<ProductI>  {
        return this.productos('productos').insert(data);
    }
    

    async update(_id: string, newProductData: newProductI): Promise<ProductI> {
        return this.productos.from('productos').where({ _id }).update(newProductData);
    }


    async delete(_id: string) : Promise<void> {
        return this.productos.from('productos').where({ _id }).del();
    }

    async query(options: ProductQuery): Promise<ProductI[]> {
        let query: ProductQuery = {};

        if (options.name) query.name = options.name;

        if (options._id) query._id = options._id;

        if (options.priceMin) return this.productos.from('productos').where('price','>',options.priceMin);
        if (options.priceMax) return this.productos.from('productos').where('price','<',options.priceMax);
        if (options.priceMin && options.priceMax) return this.productos.from('productos').whereBetween('price',[options.priceMin,options.priceMax]);

        if (options.stockMin) return this.productos.from('productos').where('price','>',options.stockMin);
        if (options.stockMax) return this.productos.from('productos').where('price','<',options.stockMax);
        if (options.stockMin && options.stockMax) return this.productos.from('productos').whereBetween('price',[options.stockMin,options.stockMax]);


        return this.productos.from('productos').where(query);   
    }

}