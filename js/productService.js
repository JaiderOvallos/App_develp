function getProducts(page){
    document.getElementById('cardHeader').innerHTML='<h3> lista de productos</h3>'
    document.getElementById('info').innerHTML=''

    fetch("https://reqres.in/api/unknown?page=" + page, {
        method:"GET",
        headers:{
            "content-type" :"application/json",
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then((result)=>{
        return result.json().then(
            data => {
                return {
                    status: result.status,
                    body: data
                }
            }
        )
    })

    .then((response) =>{
        if(response.status===200){
            let listProducts = `
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Year</th>
                        <th scope="col">Color</th>
                        <th scope="col">Value</th>
                        </tr>
                    </thead>
                    <tbody>
            
            `
            response.body.data.forEach(product => {
               listProducts = listProducts.concat(`
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.year}</td>
                        <td><input type="color" value="${product.color}"></td>
                        <td>${product.pantone_value}</td>
                        <td>
                            <button type="button" class="btn btn-outline-primary" onclick="showInfoProduct('${product.id}')">View</button>
                        </td>
                        
                    </tr>
                    
                    `)
            })
            listProducts=listProducts.concat(`
                
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center" >
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                            </li>
                            <li class="page-item"><a class="page-link" href="#" onclick="getProducts('1')">1</a></li>
                            <li class="page-item"><a class="page-link" href="#" onclick="getProducts('2')">2</a></li>
                            <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>

                `)
                document.getElementById('info').innerHTML=listProducts
           
        }else{
            document.getElementById('info').innerHTML='<h3> No se encuentra usuario </h3>'
        }
    })

}

function showInfoProduct(productId){

    fetch("https://reqres.in/api/unknown/" +productId, {
        method:"GET",
        headers:{
            "content-type" :"application/json",
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then((result)=>{
        return result.json().then(
            data => {
                return {
                    status: result.status,
                    body: data
                }
            }
        )
    })

    .then((response)=>{
        if(response.status === 200){

            showModalProduct(response.body.data)

        }else{
            document.getElementById('info').innerHTML= '<h3> No se encontro el producto</h3>'
        }
    })
}

function showModalProduct(product){
    const modalProduct =`
        <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Show Product</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
               <div class="card">
                  <input type="color" value="${product.color}" style="width:100%">
                  <div class="card-body">
                    <h5 class="card-title">Product Info</h5>
                    <p class="card-text">First Name : ${product.id}</p>
                    <p class="card-text">First Name : ${product.name}</p>
                    <p class="card-text">First Name : ${product.year}</p>
                    <p class="card-text">First Name : ${product.pantone_value}</p>
                  </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>

    `
    document.getElementById('showModal').innerHTML= modalProduct
    const modal= new bootstrap.Modal(document.getElementById('modalProduct'))

    modal.show()
}