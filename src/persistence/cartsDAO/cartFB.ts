import FBconfig from '../../../firebase.json';
import admin from 'firebase-admin';
import {
    ProductI,
} from '../../models/productsInterfaces';

const serviceAccount = FBconfig as admin.ServiceAccount;

export class CartFirebaseDAo  {
    private products;

    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        
        const db = admin.firestore();
        this.products = db.collection('cart')
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

    async add(data: ProductI): Promise<FirebaseFirestore.WriteResult> {
		const doc = this.products.doc();
		return await doc.create(data);
	}


    async delete(id : string)  : Promise<void> {
        await this.products.doc(id).delete();
    };

    
}