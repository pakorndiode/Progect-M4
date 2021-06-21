
const base_url = "https://api.jikan.moe/v3";

var ainmeShow = document.getElementById('anime');

ainmeShow.addEventListener('click',function e(){
    const cardimage = document.getElementById('card-image');
    cardimage.innerHTML=`<img src="${anime.image_url}">`
    const cardtitle = document.getElementById('card-title');
    cardtitle.innerHTML=`${anime.title}`
    const cardtitlep = document.getElementById('card-title-p');
    cardtitlep.innerHTML=`${anime.synopsis}`
    const cardaction = document.getElementById('card-action');
    cardaction.innerHTML=`<a href="${anime.url}">Find out more</a>`          
})

function searchAnime(event){
    event.preventDefault();
    const query = document.getElementById('search')
    fetch(`${base_url}/search/anime?q=${query.value}&page=1`)
    .then(response=>response.json())
    .then(updateDom)
    .catch(err=>console.warn(err.message));
}

function updateDom(data){
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = data.results
        .map(anime=>{
            return `
            <div class="card bg-light mb-3" style="max-width: 540px;">
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
            </div>` }).join("");
}

function pageLoaded(){
    const form = document.getElementById('header');
    form.addEventListener("submit", searchAnime);
}


window.addEventListener("load", pageLoaded);