import FBconfig from '../../../firebase.json';
import admin from 'firebase-admin';
import {
    newProductI,
    ProductI,
    ProductQuery,
} from '../../models/productsInterfaces';

const serviceAccount = FBconfig as admin.ServiceAccount;

export class FirestoreDAO  {
    private products;

    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        
        const db = admin.firestore();
        this.products = db.collection('products')
    }

    async get(id?: string): Promise<FirebaseFirestore.DocumentData> {
        if(id) {
            let result = await this.products.doc(id).get();
            return ({
                id: result.id,
                data: result.data(),
            });
        } else {
            let resultado = await this.products.get();

            let docs = resultado.docs;

            const output = docs.map(aDoc => ({
                id: aDoc.id,
                data: aDoc.data()
            }))

            return output;
        }
    }

    async add(data: newProductI): Promise<FirebaseFirestore.WriteResult> {
		const doc = this.products.doc();
		return await doc.create(data);
	}


    async update(id: string, newProductData: newProductI) : Promise<FirebaseFirestore.WriteResult> {
        const miDoc = this.products.doc(id);
        const productUpdated = await this.products.doc(id).update(newProductData);
        return productUpdated;
    };

    async delete(id : string)  : Promise<void> {
        await this.products.doc(id).delete();
    };

    async query(options : ProductQuery) : Promise<FirebaseFirestore.DocumentData | undefined> {
        if (options.name) return this.products.where('name','==',options.name).get();
        if (options._id) return this.products.where('id','==',options._id).get();
        if(options.priceMin) return this.products.where('price','>',options.priceMin).get();
        if(options.priceMax) return this.products.where('price','<',options.priceMax).get();

        if(options.stockMin) return this.products.where('stock','>',options.stockMin).get();
        if(options.stockMax) return this.products.where('stock','<',options.stockMax).get();
    };
}