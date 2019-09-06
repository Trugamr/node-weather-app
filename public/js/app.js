const weatherForm = document.querySelector('form')
const search = document.querySelector('form input')
const msgOne = document.querySelector('#message-1')
const msgTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''

    fetch(`${window.location.href}weather?search=${search.value}`)
    .then(response => response.json())
    .then(({ error, placeName, forecast, search }) => {
       if(error) {
            msgOne.textContent = 'Error'
            msgTwo.textContent = error
        } else {
            msgOne.textContent = placeName
            msgTwo.textContent = forecast
        }
    })
})