import codes from './codes.js'
const c = new codes()


document.addEventListener('DOMContentLoaded', async() => {
    const token = await getToken()
    console.log(token)
    // console.log('pivjpdjip')

    let input = document.getElementById('input')
    let button = document.getElementById('button')
    


    button.addEventListener('click', () => {
        let id = input.value.split('/playlist/')[1].split('?')[0]
        getPlaylist(id, token)
    })






})



async function getPlaylist(id, token){
    fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
        mode: 'cors',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    }).then(r =>r.json()
    ).then(j=>{
        j.items.forEach(elem => {
            trackByTrack(elem.track)  
        });
    
    }).catch(e => console.log(e))
}






async function trackByTrack(arg){
    console.log(arg)

    let p = document.createElement('p')
    document.getElementById('tracks').appendChild(p)
    p.innerHTML = arg.name
}


async function getToken(){

    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(c.id + ':' + c.secretId),
            // 'Access-Control-Allow-Origin':'*'
        },
        body: 'grant_type=client_credentials',
        mode: 'cors'
    });

    const data = await result.json();
    return data.access_token;
}