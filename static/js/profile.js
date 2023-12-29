const logoutForm = document.querySelector('form')

logoutForm.addEventListener('submit', async ev => {
    ev.preventDefault()

    const response = await fetch('/api/sessions/current', {
        method: 'DELETE'
    })

    if (response.status === 204) {
        window.location.href = '/login'
    } else {
        const error = await response.json()
        alert('Error: ' + error.message)
    
    }
})