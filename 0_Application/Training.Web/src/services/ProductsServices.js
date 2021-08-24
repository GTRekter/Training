class ProductsService {    
    getAllProducts(){
        return fetch(process.env.REACT_APP_API_BASEURL + "Product/GetAllProducts",{ 
            method: 'get',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            }
        })
        .then(res => res.json());        
    }
    addProduct(name, price){
        return fetch(process.env.REACT_APP_API_BASEURL + "Product/AddProduct",{ 
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            },
            body: JSON.stringify({
                name: name,
                price: price
            })
        })
        // .then(res => res.json());        
    }
    deleteProduct(id){
        return fetch(process.env.REACT_APP_API_BASEURL + "Product/DeleteProductById",{ 
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            },
            body: JSON.stringify({
                id: id
            })
        })
        //.then(res => res.json());        
    }
}
export default new ProductsService();