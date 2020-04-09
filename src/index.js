document.addEventListener('DOMContentLoaded', () => {
    handleFetch()
    // formSubmit()
})

const tableBody = document.getElementById('table-body')
const dogForm = document.getElementById('dog-form')

const handleFetch = () => {
    fetch("http://localhost:3000/dogs")
    .then(res => res.json())
    .then(dogs => renderDogs(dogs))
}

const renderDogs = dogs => {
    while (tableBody.firstChild) {
        tableBody.firstChild.remove()
    }
    dogs.forEach(dog => {
        displayDogs(dog)
    })
}

const displayDogs = dog => {


const tableRow = document.createElement('tr')
const dogName = document.createElement('td')
dogName.innerText = dog.name
const dogBreed = document.createElement('td')
dogBreed.innerText = dog.breed
const dogSex = document.createElement('td')
dogSex.innerText = dog.sex 
const editTd = document.createElement('td')
const editBtn = document.createElement('button')
editBtn.innerText = 'edit dog'
editBtn.dataset.id = dog.id

editBtn.addEventListener('click', e => {
    // debugger
    // let clickButton = e.target.dataset.id
    
    fetch(`http://localhost:3000/dogs/${e.target.dataset.id}`)
    .then(res => res.json())
    .then(dogInfo => renderInfo(dogInfo))

})
editTd.appendChild(editBtn)
tableRow.append(dogName, dogBreed, dogSex, editTd)
tableBody.appendChild(tableRow)

}

const renderInfo = (dogInfo) => {
    dogForm.name.value = dogInfo.name
    dogForm.breed.value = dogInfo.breed
    dogForm.sex.value = dogInfo.sex

    dogForm.addEventListener('submit', e => {
        e.preventDefault()
        // debugger
        // console.log(e.target)
        // console.log(dogInfo)
        fetch(`http://localhost:3000/dogs/${dogInfo.id}`, {
            method: 'PATCH',

            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: e.target.name.value,
                breed: e.target.breed.value,
                sex: e.target.sex.value
            })
        })
        .then(res => res.json())
        .then(update => {
            // console.log(update)
            e.target.reset()
            handleFetch()
        })

    })
}

