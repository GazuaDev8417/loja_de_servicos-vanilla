const jobs = document.getElementById('services')
const search = document.getElementById('search')
const BASE_URL = 'https://achei-servicos-server.vercel.app'
let services = []


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


window.takeJobId = (job)=>{
    localStorage.setItem('job', JSON.stringify(job))
    location.href = '../detail/index.html'
}


const getAllJobs = ()=>{
    fetch(`${BASE_URL}/jobs`, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    }).then(res => res.json())
        .then(data=>{

            services = data
            
            jobs.innerHTML = data.map(job=>{
                return `
                    <div class='cartao' key=${job.id}>
                        <div class='name'>${job.title}</div>
                        <div style="text-align: left; margin-bottom: 20px;">
                            <b>Descrição: </b>${job.description}<br/><br/>
                            <b>Contato: </b>${convertPhone(job.phone)}<br/><br/>
                            <b>Horário de atendimento: </b>${job.period}
                        </div>
                        <button
                            onclick='takeJobId(${JSON.stringify(job)})'
                            class='btn btn-primary'>
                            Entrar em contato
                        </button>
                    </div>
                `
            }).join('')

        }).catch(e=>{
            alert(e.message)
        })
}

getAllJobs()


search.addEventListener('input', ()=>{
    const filtered = services.filter(item=>{
        return item.title.toLowerCase().includes(search.value.toLocaleLowerCase())
    })

    jobs.innerHTML = filtered.map(job=>{
        return `
            <div class='cartao' key=${job.id}>
                <div class='name'>${job.title}</div>
                <div style="text-align: left; margin-bottom: 20px;">
                    <b>Descrição: </b>${job.description}<br/><br/>
                    <b>Contato: </b>${convertPhone(job.phone)}<br/><br/>
                    <b>Horário de atendimento: </b>${job.period}
                </div>
                <button
                    onclick='takeJobId(${JSON.stringify(job)})'
                    class='btn btn-primary'>
                    Entrar em contato
                </button>
            </div>
        `
    }).join('')
})