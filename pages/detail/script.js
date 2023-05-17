const job = JSON.parse(localStorage.getItem('job'))
const message = `Olá, vi seu serviço anunciado no aplicativo Loja de Serviços e gostaria de contratá-lo`



window.addEventListener('load', ()=>{
    const token = localStorage.getItem('token')

    if(!token){
        location.href = '../../index.html'
    }
})


const convertPhone = (phone)=>{
    const phoneToStr = phone.toString()

    const ddd = phoneToStr.substring(0,2)
    const prefix = phoneToStr.substring(2,7)
    const sufix = phoneToStr.substring(7,11)

    return `(${ddd}) ${prefix}-${sufix}`
}


document.querySelector('.title').innerHTML = job.title
document.querySelector('.name').innerHTML = job.title
document.querySelector('.card-content').innerHTML = `
    <b>Descrição: </b>${job.description}<br/><br/>
    <b>Contato: </b>${convertPhone(job.phone)}<br/><br/>
    <b>Horário de atendimento: </b>${job.period}
`
document.querySelector('.link').addEventListener('click', ()=>{
    window.open(`https://api.whatsapp.com/send?phone=55${job.phone}&text=${message}`, '_blank')
}) 