/////////////////////////////////////SHOW SEARCH///////////////////////////////////////////
function searchAnime(event){
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
    card.addEventListener('click',function(){
        console.log(anime.title)
        let confirms = confirm(`ท่านต้องการเพิ่ม ${anime.title} เข้าไปในListหรือไม่`)
        if (confirms){
        addToList(anime)
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
ID = ${data.id}`) 
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
        addStudentList(data)
    })
}

function addStudentList(data){
    console.log(data)
    let counter = 1
    for(anime of data){
        addStudentTotable(counter++,anime)
    }
}

function addStudentTotable(index,anime){
    console.log(anime)
    const tableBody = document.getElementById('tableBody')
    let row = document.createElement('tr')
    let cell = document.createElement('th')
    cell.setAttribute('score','row')
    cell.innerHTML = index
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = `${anime.title} ${anime.synopsis}`
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = anime.id
    let img = document.createElement('img')
    img.setAttribute('src',anime.image_url)
    img.height = 200
    img.classList.add('img-thumbnail')
    cell.appendChild(img)
    row.appendChild(cell)
    cell = document.createElement('td')
    let button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-danger')
    button.setAttribute('type','button')
    button.innerText = 'delete'
    button.addEventListener('click',function() {
        let confirms = confirm(`ท่านต้องการลบคุณ ${anime.title} หรือไม่`)
        if (confirms){
        deleteList(anime.id)
        }
    })
    cell.appendChild(button)
    row.appendChild(cell)
    cell = document.createElement('td')
    let button2 = document.createElement('button')
    button2.classList.add('btn')
    button2.classList.add('btn-primary')
    button2.setAttribute('type','button2')
    button2.innerText = 'Edit'
    button2.addEventListener('click',function() {
        let confirms2 = confirm(`ท่านต้องการแก้ไขคุณ ${anime.name} หรือไม่`)
        if (confirms2){
        singleStudentResult.style.display='none'
        listStudentResult.style.display='none'
        addUserDetail.style.display='block'
        console.log(student.id)
        ip = student.id
        }
    })
    cell.appendChild(button2)
    row.appendChild(cell)
    row.appendChild(cell)
    tableBody.appendChild(row)
    hideAll()
    displaySearch()
}  

//////////////////////////////HIDE ALL//////////////////////////////////////////
var getss = document.getElementById('showList')
var showAnime = document.getElementById('showAnime')

function hideAll(){
    showList.style.display='none'
}
var countList = 0
var list = document.getElementById('List')
list.addEventListener('click',function(){
    if(countList==0){
        showList.style.display='block'
        showAnime.style.display='none'
        countList++
    }else{
        showList.style.display='none'
        showAnime.style.display='block'
        countList=0
    }
})