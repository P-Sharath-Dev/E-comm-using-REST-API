export default class ProductModel{
    constructor(_id, _name, _description, _imageUrl, _category, _price){
        this.id = _id;
        this.name = _name;
        this.description = _description;
        this.imageUrl = _imageUrl;
        this.category = _category;
        this.price = _price;
    }

    //return all products
    static getAllProducts(){
        return products;
    }
    
    //adding product
    static addProduct(_name, _description, _imageUrl, _category, _price){
        const newProduct = new ProductModel(
            products.length+1,
            _name,
            _description,
            _imageUrl,
            _category,
            _price
        );
        products.push(newProduct);
    }

    //get product by id
    static getProductById(id){
        const product = products.find(product => product.id == id);
        return product;
    }

    //get filtered products
    static getfilteredProducts(minPrice, maxPrice, category){
        const filteredProducts = products.filter((product)=>{
            return((!minPrice || product.price >= minPrice)&&
                   (!maxPrice || product.price <= maxPrice)&&
                   (!category || product.category == category)
                );
        });
        return filteredProducts;
    }

    //update product
    static updateProduct(id, updatedData){
        const product = products.find(p=> p.id == id);
        if(product){
            product.name = updatedData.name || product.name;
            product.description = updatedData.description || product.description;
            product.imageUrl = updatedData.imageUrl || product.imageUrl;
            product.category = updatedData.category || product.category;
            product.price = updatedData.price || product.price;
            return product;
        }
        else{
            return null;
        }
    }

    //deleting product
    static deleteProduct(id){
        const index = products.findIndex(p => p.id == id);
        if(index !== -1){
            products.splice(index,1);
            return true; // if product deleted successfully return true
        }
        else{
            return false; // if product not deleted return false
        }
    }
}

const products = [
    new ProductModel(
        1,
        "samsung s23 ultra",
        "Samsung Galaxy S24 Ultra 5G AI Smartphone (Titanium Yellow, 12GB, 256GB Storage)",
        "https://m.media-amazon.com/images/I/41QTM+veBgL._SY300_SX300_.jpg",
        "mobile",
        108550,
    ),
    new ProductModel(
        2,
        "OnePlus 12",
        "OnePlus 12 (Flowy Emerald, 16GB RAM, 512GB Storage)",
        "https://m.media-amazon.com/images/I/61BAuSC0UnL._SL1464_.jpg",
        "mobile",
        69999,
    ),
    new ProductModel(
        3,
        "Apple iPhone 15 Pro Max",
        "Apple iPhone 15 Pro Max (256 GB) - Black Titanium",
        "https://m.media-amazon.com/images/I/81Os1SDWpcL._SL1500_.jpg",
        "mobile",
        143999,
    ),
    new ProductModel(
        4,
        "Dell Inspiron 3520",
        "Intel Core i5-1235U Processor, 8GB, 512GB SSD, 15.6 (39.62cm) FHD 120Hz 250 nits, Win 11 + MSO'21, Backlit KB, 15 Months McAfee, Silver, 1.65kg",
        "https://m.media-amazon.com/images/I/61LKYyGTn7L._SL1080_.jpg",
        "laptop",
        47890,
    ),
];