
const baseUrl= 'http://localhost:3000'
const signinUrl = baseUrl + '/signin'
const createAccountUrl = baseUrl + '/newAccount'


const post = (url, data) => 
{ 
return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
}).then(resp => {
    return resp.json()})
}

const createAccount = (user) => post(createAccountUrl, user)
const signIn = (user) => post(signinUrl, user)


export default { signIn, createAccount }