const form = document.getElementById('form')
const email = document.getElementById('email')
const password = document.getElementById('password')
const BASE_URL = 'https://loja-de-servicos-server.vercel.app'



window.addEventListener('load', ()=>{
    const token = localStorage.getItem('token')

    if(token){
        location.href = './pages/list/index.html'
    }
})


const limpar = ()=>{
    email.value = ''
    password.value = ''
}

form.addEventListener('submit', (e)=>{
    e.preventDefault()

    const body = {
        email: email.value,
        password: password.value
    }

    fetch(`${BASE_URL}/login`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.text()).then(data=>{
        localStorage.setItem('token', data)
        location.href = './pages/list/index.html'
    }).catch(e=>{
        alert(e.message)
        console.log(e.message)
    })
})
