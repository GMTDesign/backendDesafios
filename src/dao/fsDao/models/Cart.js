export class Cart {
    constructor({ id, products }) {
        this.id = id
        this.products = products ?? []
    }

    asPOJO() {
        return {
            id: this.id,
            products: this.products
        }
    }
}
