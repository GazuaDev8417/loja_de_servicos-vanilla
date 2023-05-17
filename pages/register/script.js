const title = document.getElementById('title')
const description = document.getElementById('description')
const phone = document.getElementById('phone')
const period = document.getElementById('period')
const BASE_URL = 'https://achei-servicos-server.vercel.app'



window.addEventListener('load', ()=>{
    const token = localStorage.getItem('token')

    if(!token){
        location.href = '../../index.html'
    }
})


document.getElementById('form').addEventListener('submit', (e)=>{
    e.preventDefault()

    const body = {
        title: title.value,
        description: description.value,
        phone: phone.value,
        period: period.value
    }
    fetch(`${BASE_URL}/jobs`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify(body)
    }).then(res => res.text()).then(()=>{
        alert(`${title.value} cadastrado com sucesso.`)
        location.href='../list/index.html'
    }).catch(e=>{
        alert(e.message)
    })
})