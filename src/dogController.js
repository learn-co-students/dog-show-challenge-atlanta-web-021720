class DogController
{
    static BASE_URL = 'http://localhost:3000/dogs';

    static init() 
    {
        // Adapter.getData('http://localhost:3000/dogs')
        Adapter.getData(DogController.BASE_URL)
        .then(DogController.renderData)
        // console.log('init called')
        const form = document.querySelector('#dog-form');
        form.addEventListener('submit',DogController.handleSubmit);
    }

    static renderData(array) 
    {
        const table = document.querySelector('#table-body');
        table.innerHTML = ''
        array.forEach(DogController.render);
    }

    static render(element) 
    {
        const table = document.querySelector('#table-body')
        const dog = new Dog(element)
        table.append(dog.element())
    }

    static handleClick(e) {
        const id = e.target.dataset.id
        Adapter.getData(DogController.BASE_URL,id)
        .then(DogController.populateForm)
    }
    
    static populateForm(dog) {
        const newDog = new Dog(dog)
        const form = document.querySelector('#dog-form')
        form.dataset.id = newDog.id
        form.name.value = newDog.name
        form.breed.value = newDog.breed
        form.sex.value = newDog.sex
    }

    static handleSubmit(e) {
        e.preventDefault()
        const data = {
        id: e.target.dataset.id,
        name: e.target.name.value,
        breed: e.target.breed.value,
        sex: e.target.sex.value
    }
    Adapter.editData(DogController.BASE_URL,data)
        .then(Adapter.getData(DogController.BASE_URL))
        .then(DogController.renderDogs)
        e.target.reset()
        e.target.dataset.id = ''
    }
}