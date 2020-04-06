document.addEventListener('DOMContentLoaded', () => {
    tableBody = document.querySelector("#table-body")
    fetchDogs()
})

function fetchDogs() {
    let dogForm = document.querySelector("#dog-form")
    fetch("http://localhost:3000/dogs")
    .then(req => req.json())
    .then(dogData => {
        dogData.forEach(dog => {
                newDog(dog);
            })
    })
}

function newDog(dog) {
    let newTr = document.createElement("tr")
    newTr.id = dog.id

    let dogNameTd = document.createElement("td")
    dogNameTd.innerHTML = dog.name
    dogNameTd.id = "dog-name"

    let dogBreedTd = document.createElement("td")
    dogBreedTd.innerHTML = dog.breed
    dogBreedTd.id = "dog-breed"

    let dogSexTd = document.createElement("td")
    dogSexTd.innerHTML = dog.sex
    dogSexTd.id = "dog-sex"

    let dogEditBtn = document.createElement("button")
    dogEditBtn.innerHTML = "Edit"

    dogEditBtn.addEventListener("click", e => {
        let dogForm = document.querySelector("#dog-form")
        let dogName = e.target.parentElement.querySelector("#dog-name").innerText
        let dogBreed = e.target.parentElement.querySelector("#dog-breed").innerText
        let dogSex = e.target.parentElement.querySelector("#dog-sex").innerText
        let dogId = e.target.parentElement.id

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
                .then(req => req.json())
                .then(newData => {
                    dogForm.getElementsByTagName("input").name.placeholder = "dog's name"
                    dogForm.reset();
                    while (tableBody.firstElementChild) {
                        tableBody.firstElementChild.remove()
                    }
                    fetchDogs()
                })
            })
    })
    newTr.append(dogNameTd, dogBreedTd, dogSexTd, dogEditBtn)
    tableBody.appendChild(newTr)
}