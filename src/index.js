document.addEventListener('DOMContentLoaded', () => {

})


fetchDogs()
function fetchDogs(){

    fetch("http://localhost:3000/dogs")
    .then(response => response.json())
    .then(data => {
        renderDogs(data) 
    })
}

function renderDogs(data){
    let dogsTable = document.querySelector("#table-body")
    
    // console.log(data)
    for (dog of data){
        let tableRow = document.createElement("tr")
        let dogName = document.createElement("td")
        let dogBreed = document.createElement("td")
        let dogSex = document.createElement("td")
        let dogEdit = document.createElement("button")
        dogName.innerHTML = dog.name
        dogBreed.innerHTML = dog.breed
        dogSex.innerHTML = dog.sex
        dogEdit.innerHTML = "Edit"
        dogEdit.id = dog.id

        dogsTable.appendChild(tableRow)
        tableRow.appendChild(dogName)
        tableRow.appendChild(dogBreed)
        tableRow.appendChild(dogSex)
        tableRow.appendChild(dogEdit)

        dogEdit.addEventListener("click",function(e){
            // console.log(dogBreed.innerHTML)
            let foundForm = document.querySelector("#dog-form")
            
            foundForm.name.value = dogName.innerHTML
            foundForm.breed.value = dogBreed.innerHTML
            foundForm.sex.value = dogSex.innerHTML
            let  dogId = dogEdit.id



            editDog(foundForm, dogId)
        })

    }
}

function editDog(foundForm, dogId){


foundForm.addEventListener("submit",function(e){
    e.preventDefault()
    // console.log(e.target.placeholder.value)
    let editName = e.target.name.value
    let editBreed = e.target.breed.value
    let editSex = e.target.sex.value


    data = {
        name: editName,
        breed: editBreed,
        sex: editSex,
    }



    fetch(`http://localhost:3000/dogs/${dogId}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        deleteList()
        fetchDogs()

    })
})
}

function deleteList(){

    let tbody = document.querySelector("#table-body")

   while(tbody.firstChild){
       tbody.firstChild.remove()
   }
}