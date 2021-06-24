/////////////////////////////////////SHOW SEARCH///////////////////////////////////////////
function searchAnime(event){
    onload()
    showList.style.display='none'
    const searchResults = document.getElementById('showAnime')
    searchResults.innerHTML = ''
    event.preventDefault();
    const search = document.getElementById('search')
    fetch(`https://api.jikan.moe/v3/search/anime?q=${search.value}&page=1`)
    .then((response)=>{
        return response.json()
    }).then(data =>{
        console.log(data)
        data.results.map((anime) =>{
            console.log(anime.mal_id)
            updateAnime(anime)
        })
    })
    .catch(err=>console.warn(err.message));
}

function updateAnime(anime){
    const searchResults = document.getElementById('showAnime')
    let card = document.createElement('div')
    card.classList.add('card','bg-dark','text-white','my-2','mx-3')
    let image = document.createElement('img')
    image.classList.add('card-img')
    image.setAttribute('src',anime.image_url)
    card.addEventListener('dblclick',function(){
        console.log(anime.title)
        let confirms = confirm(`ท่านต้องการเพิ่ม ${anime.title} เข้าไปใน List หรือไม่`)
        if (confirms){
        const searchResults = document.getElementById('showList')
        searchResults.innerHTML = ''
        addToList(anime)
        onload()
        //location.reload()
        }else{
            console.log("กดยกเลิก")
        }
    })
    card.appendChild(image)
    let title = document.createElement('h6')
    title.classList.add('card-img-overlay')
    title.innerHTML = `${anime.title}`
    card.appendChild(title)
    searchResults.appendChild(card)     
}

var displaySearch
function displaySearch(){
    const form = document.getElementById('header');
    form.addEventListener("submit",searchAnime);
}

///////////////////////////////////ADD TO LIST///////////////////////////////////////////////

function addToList(anime){
    console.log(anime.mal_id)
        fetch('https://se104-project-backend.du.r.appspot.com/movies/',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
            body:JSON.stringify({
            "id":632110345,
            "movie": {
                    "url": anime.url,
                    "image_url": anime.image_url,
                    "title": anime.title,
                    "synopsis": anime.synopsis,
                    "type": anime.type,
                    "episodes": anime.episodes,
                    "score": anime.score,
                    "rated": anime.rated
                    }
            })
        }).then((response)=>{
                return response.json()
            }).catch(err=>console.warn(err.message));
            
        
}
///////////////////////////////////DELETE IN LIST///////////////////////////////////////////////

function deleteList(id){
    fetch( `https://se104-project-backend.du.r.appspot.com/movie?id=632110345&&movieId=${id}`,{
         method: 'DELETE' 
    }).then(response => { 
        if (response.status === 200)
        { 
            return response.json() 
        }else{
             throw Error(response.text) }
    }).then(data =>
            { alert(`Anime name ${data.title} is now deleted 
ID = ${data.id}` ) //location.reload()
                    onload()
                    const searchResults = document.getElementById('showList')
                    searchResults.innerHTML = ''
    }).catch( error => 
            { alert('your input Anime id is not in the database') 
    })
}
//////////////////////////////////////SHOW DETAIL//////////////////////////////////////////////

function detailsF(id) {

        fetch( `https://se104-project-backend.du.r.appspot.com/movie/632110345/${id}`,{
            method: 'GET' 
        })
    .then(response => {
        return response.json()
    }).then(data =>{
        showDetail(data)
    }).catch(err=>console.warn(err.message));
}

function showDetail(anime){
    const searchResults = document.getElementById('showDetail')
    let card = document.createElement('div')
        card.classList.add('card','m-3')
    let card2 = document.createElement('div')
        card2.classList.add('d-flex','flex-warp','justify-content-start')
    let image = document.createElement('img')
        image.setAttribute('src',anime.image_url)
    let card3 = document.createElement('div')
        card3.classList.add('card-body')
    let title = document.createElement('h5')
        title.classList.add('card-title')
        title.innerHTML = `Title : ${anime.title}`
    let details = document.createElement('p')
        details.classList.add('card-text')
        details.innerHTML = `Details : ${anime.synopsis}`
    let url = document.createElement('p')
        url.classList.add('card-text')
        url.innerHTML =`Url : `
    let a = document.createElement('a')
        a.setAttribute('href',anime.url) 
        a.innerHTML = `${anime.url}`
    let image_url = document.createElement('p')
        image_url.classList.add('card-text')
        image_url.innerHTML = `${anime.image_url}`
    let type = document.createElement('p')
        type.classList.add('card-text')
        type.innerHTML = `Type : ${anime.type}`
    let episodes = document.createElement('p')
        episodes.classList.add('card-text')
        episodes.innerHTML = `Episodes : ${anime.episodes}`
    let score = document.createElement('p')
        score.classList.add('card-text')
        score.innerHTML = `Rcore : ${anime.score}`
    let rated = document.createElement('p')
        rated.classList.add('card-text')
        rated.innerHTML = `Rated : ${anime.rated}`
    let id = document.createElement('p')
        id.classList.add('card-text')
        id.innerHTML = `ID : ${anime.id}`
    let viwe = document.createElement('button')
        viwe.classList.add('btn','btn-sm','btn-outline-primary')
        viwe.setAttribute('type','button')
        viwe.innerText = 'Viwe'
        viwe.addEventListener('click',function(){
            searchResults.innerHTML=''
            const A = document.getElementById('showList')
            A.innerHTML = ''
            onload()
            showList.style.display='flex'
        })

    card.appendChild(card2)
    card2.appendChild(image)
    card2.appendChild(card3)
    card3.appendChild(title)
    card3.appendChild(details)
    card3.appendChild(type)
    card3.appendChild(episodes)
    card3.appendChild(score)
    card3.appendChild(rated)
    card3.appendChild(id)
    card3.appendChild(url)
    url.appendChild(a)
    card2.appendChild(viwe)
    searchResults.appendChild(card)

}

///////////////////////////////////SHOW IN LIST////////////////////////////////////////////////


function onload(){
    fetch('https://se104-project-backend.du.r.appspot.com/movies/632110345')
    .then((response)=>{
        return response.json()
    }).then(data=>{
        console.log(data)
        addAnime(data)
    })
}

function addAnime(data){
    console.log(data)
    for(anime of data){
        addAnimeTotable(anime)
    }
}

function addAnimeTotable(anime){
    console.log(anime)
    const searchResults = document.getElementById('showList')
    let card = document.createElement('div')
        card.classList.add('col-4','my-4',)
    let card2 = document.createElement('div')
        card2.classList.add('card','m-3','col-10')
    let image = document.createElement('img')
        image.classList.add('card-img-top')
        image.setAttribute('alt','100%x180')
        image.setAttribute('src',anime.image_url)
    let card3 = document.createElement('div')
        card3.classList.add('card-body')
    let title = document.createElement('h5')
        title.classList.add('card-title')
        title.innerHTML = `${anime.title}`
    let details = document.createElement('p')
        details.classList.add('card-text')
        details.innerHTML = `${anime.synopsis}`
    let card4 = document.createElement('div')
        card4.classList.add('d-flex','justify-content-end')
    let btngroup =document.createElement('div')
        btngroup.classList.add('btn-group')
    let viwe = document.createElement('button')
        viwe.classList.add('btn','btn-sm','btn-outline-primary')
        viwe.setAttribute('type','button')
        viwe.innerText = 'Viwe'
        viwe.addEventListener('click',function(){
            showList.style.display='none'
            detailsF(anime.id)
        })
    let deleteBNT = document.createElement('button')
        deleteBNT.classList.add('btn','btn-sm','btn-outline-danger')
        deleteBNT.setAttribute('type','button')
        deleteBNT.innerText = 'Delete'
        deleteBNT.addEventListener('click',function() {
            let confirms = confirm(`ท่านต้องการลบคุณ ${anime.title} หรือไม่`)
            if (confirms){
            deleteList(anime.id)
            }
        })


    card.appendChild(card2)
    card2.appendChild(image)
    card2.appendChild(card3)
    card3.appendChild(title)
    card3.appendChild(details)
    card2.appendChild(card4)
    card4.appendChild(btngroup)
    btngroup.appendChild(viwe)
    btngroup.appendChild(deleteBNT)
    searchResults.appendChild(card)
    displaySearch()
    if(limiS == 0){
        showList.style.display='none'
        limiS ++
    }
    
} 
var limiS = 0 
//////////////////////////////HIDE ALL//////////////////////////////////////////

function hideAll(){
    showList.style.display='flex'
}
var countList = 0
var list = document.getElementById('List')
list.addEventListener('click',function(){
    if(countList==0){
        showList.style.display='flex'
        showAnime.style.display='none'
        countList++
    }else{
        const searchResults = document.getElementById('showList')
        searchResults.innerHTML = ''
        onload()
        showList.style.display='none'
        showAnime.style.display='flex' 
        countList=0
        
    }
})