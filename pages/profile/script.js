const BASE_URL = 'https://loja-de-servicos-server.vercel.app'
const search = document.querySelector('.search')
let jobs = []

console.log(search.value)

window.addEventListener('load', ()=>{
    const token = localStorage.getItem('token')

    if(!token){
        location.href = '../../index.html'
    }
})


document.getElementById('logout').addEventListener('click', ()=>{
    const decide = window.confirm('Tem certeza que deseja se deslogar?')

    if(decide){
        localStorage.clear()
        location.href = '../../index.html'
    }
})


const getProfile = ()=>{
    fetch(`${BASE_URL}/user`, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    }).then(res=>{
        if(res.ok){
            return res.json()
        }else{
            return res.text()
        }
    }).then(data=>{
        
        document.querySelector('.user-info').innerHTML = `
            <b>Nome: </b>${data.name}<br/>
            <b>Email: </b>${data.email}
        `
    }).catch(e=>{
        alert(e.message)
    })
}

getProfile()


const mouseOnIcon = (id)=>{
    document.getElementById(id).style.color = 'red'
}

const mouseOutIcon = (id)=>{
    document.getElementById(id).style.color = 'white'
}

const deleteJob = (job)=>{
    const decide = window.confirm(`Tem certeza que deseja excluir ${job.title}`)

    if(decide){
        fetch(`${BASE_URL}/job/${job.id}`, {
            method:'DELETE',
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(res => res.text()).then(()=>{
            userJobs()
        }).catch(e=>{
            alert(e.message)
        })
    }
}


const  userJobs = ()=>{
    fetch(`${BASE_URL}/userjobs`, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    }).then(res=>{
        if(res.ok){
            return res.json()
        }else{
            return res.text()
        }
    }).then(data=>{
        jobs = data

        document.querySelector('.userJobs').innerHTML = data.map(job=>{
            return`
                <div
                    style='display:flex; align-items: center; justify-content: space-between;
                        border: 1px solid whitesmoke; margin: 20px; padding: 10px;
                        border-radius: 10px;' 
                        key='${job.id}'>
                    <div style='color: white;'>
                    ${job.title}
                    </div>
                    <i 
                        id='${job.id}'
                        onmouseover='mouseOnIcon("${job.id}")'
                        onmouseout='mouseOutIcon("${job.id}")'
                        onclick='deleteJob(${JSON.stringify(job)})'
                        style='color: white; cursor: pointer;'
                        class="fa-solid fa-trash"></i>
                </div>
                `
        }).join('')
    }).catch(e=>{
        alert(e.message)
    })
}
    
userJobs()
        
search.addEventListener('input', ()=>{
    const filtered = jobs.filter(item=>{
        return item.title.toLowerCase().includes(search.value.toLocaleLowerCase())
    })

    document.querySelector('.userJobs').innerHTML = filtered.map(job=>{
        return`
            <div
                style='display:flex; align-items: center; justify-content: space-between;
                    border: 1px solid whitesmoke; margin: 20px; padding: 10px;
                    border-radius: 10px;' 
                    key='${job.id}'>
                <div style='color: white;'>
                ${job.title}
                </div>
                <i 
                    id='${job.id}'
                    onmouseover='mouseOnIcon("${job.id}")'
                    onmouseout='mouseOutIcon("${job.id}")'
                    onclick='deleteJob(${JSON.stringify(job)})'
                    style='color: white; cursor: pointer;'
                    class="fa-solid fa-trash"></i>
            </div>
            `
    }).join('')
})

