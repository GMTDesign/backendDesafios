const loginForm = document.querySelector('form')

loginForm.addEventListener('submit', async ev => {
    ev.preventDefault()
    const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(loginForm))
    })

    if (response.status === 201) {
        const session = await response.json()
        const user = JSON.stringify(session.payload.email)
        alert('Bienvenido usuario: ' + user)
        window.location.href = '/home'
    } else {
        const error = await response.json()
        alert('Error: ' + error.message)
        
    }
})