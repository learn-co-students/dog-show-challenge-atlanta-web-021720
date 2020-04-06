document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded...")
    dogParent = document.querySelector("#table-body")
    fetchDogs()
})

//Fetches all dogs 
function fetchDogs() {
    fetch("http://localhost:3000/dogs")
        .then(resp => resp.json())
        .then(dogs => {
            console.log(dogs)
            dogs.forEach(dog => {
                renderDog(dog)
            })
        })
}

//Renders a single dog
function renderDog(dog) {
    newDog = document.createElement("tr")
    newDog.id = dog.id
    dogName = document.createElement("td")
    dogName.innerText = dog.name
    dogName.id = "dog-name"
    dogBreed = document.createElement("td")
    dogBreed.innerText = dog.breed
    dogBreed.id = "dog-breed"
    dogSex = document.createElement("td")
    dogSex.innerText = dog.sex
    dogSex.id = "dog-sex"
    editDogBtn = document.createElement("button")
    editDogBtn.innerText = "Edit"
    editDogBtn.style.display = "block"
    editDogBtn.style.margin = "auto"
    editDogBtn.addEventListener("click", function(e) {
        let dogName = e.target.parentElement.querySelector("#dog-name").innerText
        let dogBreed = e.target.parentElement.querySelector("#dog-breed").innerText
        let dogSex = e.target.parentElement.querySelector("#dog-sex").innerText
        let dogId = e.target.parentElement.id
        console.log(dogName, dogBreed, dogSex, dogId)
        let dogForm = document.querySelector("#dog-form")
        dogForm.getElementsByTagName("input").name.value = dogName
        dogForm.getElementsByTagName("input").name.placeholder = dogId
        dogForm.getElementsByTagName("input").breed.value = dogBreed
        dogForm.getElementsByTagName("input").sex.value = dogSex
        dogForm.addEventListener("submit", function(e) {
            e.preventDefault();
            let updatedDogName = e.target.name.value
            let updatedDogBreed = e.target.breed.value
            let updatedDogSex = e.target.sex.value
            let dogId = e.target.name.placeholder
            fetch(`http://localhost:3000/dogs/${dogId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: updatedDogName,
                        breed: updatedDogBreed,
                        sex: updatedDogSex
                    })
                })
                .then(response => response.json())
                .then(updatedDog => {
                    console.log(updatedDog)
                    dogForm.getElementsByTagName("input").name.placeholder = "dog's name"
                    dogForm.reset()
                        //Clears Table
                    let tBody = document.querySelector("#table-body")
                    while (tBody.firstElementChild) {
                        tBody.firstElementChild.remove()
                    }
                    //Sets Clean Table
                    fetchDogs()
                })
        })

    })
    newDog.append(dogName, dogBreed, dogSex, editDogBtn)
    dogParent.appendChild(newDog)
}