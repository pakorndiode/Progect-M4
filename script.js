/////////////////////////////////////SHOW SEARCH///////////////////////////////////////////
function searchAnime(event){
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
            updateDom(anime)
        })
    })
    .catch(err=>console.warn(err.message));
}

function updateDom(anime){
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
        addToList(anime)
        //location.reload()
        const searchResults = document.getElementById('showList')
        searchResults.innerHTML = ''
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
            
        onload()
        
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
            console.log(anime.title)
            let confirms = confirm(`ท่านต้องการเพิ่ม ${anime.title} เข้าไปใน List หรือไม่`)
            if (confirms){
            console.log("กดตกลง")
            }else{
            console.log("กดยกเลิก")
            }
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
    showList.style.display='none'
    displaySearch()
    
}  

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
        showList.style.display='none'
        showAnime.style.display='flex' 
        countList=0
    }
})