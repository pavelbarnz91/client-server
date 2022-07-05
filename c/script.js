const inputFile = document.querySelector('.input-file');
const btn = document.querySelector('.btn');

btn.addEventListener('click', e =>{
    e.preventDefault();

    const file = inputFile.files[0];
    const formData = new FormData()
    formData.append('file', file);
    
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:9090');

    xhr.addEventListener('readystatechange', () => {
        if(xhr.readyState === xhr.DONE) { 
            let o = JSON.parse(xhr.response);
            console.log(typeof o, o);
            const img = document.createElement('img');
            img.src = o.url;
            document.body.append(img);
        }
    });



    xhr.send(formData);
})