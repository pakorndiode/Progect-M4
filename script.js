var AnimeCore=[10000]

function searchAnime(event){
    event.preventDefault();
    const query = document.getElementById('search')
    fetch(`https://api.jikan.moe/v3/search/anime?q=${query.value}&page=1`)
    .then(response=>response.json())
    .then(updateDom)
    .catch(err=>console.warn(err.message));
}

function updateDom(data){
    const searchResults = document.getElementById('showAnime');
    searchResults.innerHTML = data.results 
    .map(anime=>{ console.log(anime.mal_id) 
        core(anime.mal_id,anime.image_url,anime.title,anime.synopsis)
        return`
                <div class="card col-4 my-3 mx-2" style="max-width:250px; min-width:150px;">
                    <img src="${anime.image_url}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${anime.title}</h5>
                            <p class="card-text">
                            </p>
                    </div>
                    <button type="button" class="btn btn-outline-dark" onclick="myList()">+</button>
                    </div>`})
                
}

function pageLoaded(){
    const form = document.getElementById('header');
    form.addEventListener("submit",searchAnime);
}

window.addEventListener("load",pageLoaded);

////////////////////////////////////////////////////////////////////////
function core(anime_mal_id,anime_image_url,anime_title,anime_synopsis){
    AnimeCore=[anime_mal_id,anime_image_url,anime_title,anime_synopsis]
    console.log(AnimeCore[2])
}

function myList() {
  var txt;
  if (confirm("You want to add to the list!")) {
    txt = "You pressed OK!";
  } else {
    txt = "You pressed Cancel!";
  }
  console.log(txt)
  console.log(AnimeCore[2])
}
////////////////////////////////////////////////////////////////////////

function showAll(){
    fetch('https://se104-project-backend.du.r.appspot.com/movies/601232100')
    .then((response)=>{
        return response.json()
    }).then(data=>{
        console.log('success',data)
        getList(data.id[1])
    })
    
}
console.log(getList())
function getList(anime){
    console.log(anime)
    const showGet = document.getElementById('showGet');
    showGet.innerHTML =  `<div class="card bg-light mb-3 col-10" style="max-width: 100%;">
                <div class="row g-0">
                    <div class="col-md-8">
                        <img src="${anime}" alt="..." class="img-fluid">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${anime}</h5>
                            <p class="card-text">${anime}</p>
                            <p class="card-text">
                            <small class="text-muted">Last updated 3 mins ago</small>
                            </p>
                        </div>
                    </div>
                </div>`
}

////////////////////////////////////////////////////////////////////////



var ainmeShow = document.getElementById('anime');
ainmeShow.addEventListener('click',function(){
    const searchResults = document.getElementById('showAnime');
    console.log(anime.mal_id)
    for(let i =0; i<anime.mal_id; i++){
    searchResults.innerHTML = `<div class="card bg-light mb-3 col-4" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${anime.image_url}" alt="..." class="img-fluid">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${anime.title}</h5>
                            <p class="card-text">${anime.synopsis}</p>
                            <p class="card-text">
                            <small class="text-muted">Last updated 3 mins ago</small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>`}
})



function addStudentList(studentList){
    let counter = 1
    const tableBody = document.getElementById('search-results')
    for(student of studentList){
        addStudentTotable(counter++,student)
    }
} 