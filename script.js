

var ainmeShow = document.getElementById('anime');

ainmeShow.addEventListener('click',function(anime){
    const searchResults = document.getElementById('search-results');
    console.log(anime.mal_id)
    for(let i =0; i<anime.mal_id; i++){
    searchResults.innerHTML =
    `<div class="card bg-light mb-3 col-4" style="max-width: 540px;">
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

function searchAnime(event){
    event.preventDefault();
    const query = document.getElementById('search')
    fetch(`https://api.jikan.moe/v3/search/anime?q=${query.value}&page=1`)
    .then(response=>response.json())
    .then(updateDom)
    .catch(err=>console.warn(err.message));
}

function updateDom(data){
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = data.results 
    .map(anime=>{ console.log(anime.mal_id)
            return `
            <div class="card bg-light mb-3 col-4" style="max-width:540px;">
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
            </div>`})
}

function pageLoaded(){
    const form = document.getElementById('header');
    form.addEventListener("submit",searchAnime);
}


window.addEventListener("load",pageLoaded);

function showAllStudents(){
    fetch('https://api.jikan.moe/v3')
    .then((response)=>{
        return response.json()
    }).then(data=>{
        console.log('success',data)
        addStudentList(data)
    })
}

function addStudentList(studentList){
    let counter = 1
    const tableBody = document.getElementById('search-results')
    for(student of studentList){
        addStudentTotable(counter++,student)
    }
} 