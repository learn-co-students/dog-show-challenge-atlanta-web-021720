document.addEventListener('DOMContentLoaded', () => {
    /////////////////////////////////////////////////
    //         selectors
    const dogTableBody = document.querySelector('#table-body')
    const formInputFields = document.querySelectorAll('form input')
    const form = document.querySelector('#dog-form')
    let foundRow;
    let editId;


    fetch('http://localhost:3000/dogs')
        .then( response => response.json())
        .then( dogsData => {
            renderAllDogs(dogsData);
        })



    /////////////////////////////////////////////////
    //        event listeners

    function addEditListener(button) {
        //add listener to edit button, populate top form, patch with form submission
        button.addEventListener('click', (e) => {
            
            getRowById(e.target.dataset.id)
            let rowDeets = foundRow.querySelectorAll('td')
            formInputFields[0].value = rowDeets[0].textContent
            formInputFields[1].value = rowDeets[1].textContent
            formInputFields[2].value = rowDeets[2].textContent
            editId = foundRow.dataset.id
            addSubmitListener(form)
        })
    }

    function addSubmitListener(form) {
        form.addEventListener('submit', (e) => {
            updateObj = {
                name: e.target.name.value,
                breed: e.target.breed.value,
                sex: e.target.sex.value
            }
            fetch(`http://localhost:3000/dogs/${editId}`, {
                method: 'PATCH',
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(updateObj)
            })
            .then(response => response.json())
            .then(dogData => {
                dogTableBody.innerHTML = ""
                fetch('http://localhost:3000/dogs')
                    .then( response => response.json())
                    .then( dogsData => {
                        renderAllDogs(dogsData);
                    })
                form.reset()
            })
            //reset form
            //clear dogs and re-render
        })
    }





    /////////////////////////////////////////////////
    //        render helpers

    function renderAllDogs(dogsData) {
        dogsData.forEach( dog => {
            createTableRow(dog)
        })
    }

    function createTableRow(dog) {
        newTr = document.createElement('tr')
        nameTd = document.createElement('td')
        breedTd = document.createElement('td')
        sexTd = document.createElement('td')
        editBtn = document.createElement('button')
        editBtn.dataset.id = dog.id
        addEditListener(editBtn)
        newTr.dataset.id = dog.id
        nameTd.textContent = dog.name
        breedTd.textContent = dog.breed
        sexTd.textContent = dog.sex
        editBtn.textContent = "Edit"
        newTr.append(nameTd, breedTd, sexTd, editBtn)
        dogTableBody.append(newTr)
    }



    ////////////////////////////////////////////////
    //         misc helpers
        function getRowById(id) { //MUST ENTER ID AS STRING
            let allRows = dogTableBody.querySelectorAll('tr')
            allRows.forEach(row => {
                if (row.dataset.id === id) {
                    foundRow = row
                }
            })
        }
    
        
})