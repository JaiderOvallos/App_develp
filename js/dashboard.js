function getUsers(){
    fetch("https://reqres.in/api/users?page=1", {
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
                    data: data
                }
            }
        )
    })

    .then((response) =>{
        if(response.status===200){

            document.getElementById('info').innerHTML='<h3> lista de usarios</h3>'
        }else{
            document.getElementById('info').innerHTML='<h3> No se encuentra usuario </h3>'
        }
    })
}

function getProducts(){
    document.getElementById('info').innerHTML='<h3> lista de productos </h3>'
}

function logout(){
    localStorage.removeItem('token')
    location.href='../index.html'}