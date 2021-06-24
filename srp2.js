
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
    const tableBody = document.getElementById('tableBody')
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
}  

var getss = document.getElementById('getss')

function hideAll(){
    getss.style.display='none'
}
var countList = 0
var list = document.getElementById('List')
list.addEventListener('click',function(){
    if(countList==0){
        getss.style.display='block'
        countList++
    }else{
        getss.style.display='none'
        countList=0
    }
})