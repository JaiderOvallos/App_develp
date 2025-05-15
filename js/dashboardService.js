
tokenValidate()

function logout(){
    localStorage.removeItem('token')
    location.href='../index.html'
}

function tokenValidate(){
    const tTOKEN= localStorage.getItem('token')
    if(TOKEN !== 'QpwL5tke4Pnpja7X4'){
        Location.href= '../index.html'
    }
    console.log('autenticado',TOKEN) 
}
