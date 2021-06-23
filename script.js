function searchAnime(event){
    event.preventDefault();
    const search = document.getElementById('search')
    fetch(`https://api.jikan.moe/v3/search/anime?q=${search.value}&page=1`)
    .then((response)=>{
        return response.json()
    }).then(data =>{
        console.log(data)
        addDomList(data) 
    })
    .catch(err=>console.warn(err.message));
}

function updateDom(data){
    const searchResults = document.getElementById('showAnime');
    searchResults.innerHTML = data.results 
    .map(anime=>{ console.log(anime.mal_id)
        return `<div class="card bg-dark text-white my-2 mx-2" >
                <img class="card-img" src="${anime.image_url}" alt="Card image" height="100%" id="${anime.mal_id}">
                <div class="card-img-overlay">
                    <h5 class="card-title" style="color:snow;">${anime.title}</h5>
                </div>
                </div>`})
                
}

function addDomList(data){
    console.log(data.results)
    let counter = 1
    for(anime of data){
        updateDom(counter++,anime)
    }
}

var displaySearch
function displaySearch(){
    const form = document.getElementById('header');
    form.addEventListener("submit",searchAnime);
}

//////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////SHOW IN LIST///////////////////////////////////////////////


function onload(){
    fetch('https://se104-project-backend.du.r.appspot.com/movies/632110345')
    .then((response)=>{
        return response.json()
    }).then(data=>{
        console.log(data)
        addStudentList(data)
    })
}

function addStudentList(studentList){
    console.log(studentList)
    let counter = 1
    for(student of studentList){
        addStudentTotable(counter++,student)
    }
}

function addStudentTotable(index,student){
    console.log(student)
    const tableBody = document.getElementById('tableBody')
    let row = document.createElement('tr')
    let cell = document.createElement('th')
    cell.setAttribute('score','row')
    cell.innerHTML = index
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = `${student.title} ${student.synopsis}`
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = student.id
    let img = document.createElement('img')
    img.setAttribute('src',student.image_url)
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
        let confirms = confirm(`ท่านต้องการลบคุณ ${student.name} หรือไม่`)
        if (confirms){
        deleteStudent(student.id)
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
        let confirms2 = confirm(`ท่านต้องการแก้ไขคุณ ${student.name} หรือไม่`)
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