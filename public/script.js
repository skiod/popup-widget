
if(!localStorage.getItem('SKM_UUID')){
    let UUID = null; 
    if(!localStorage.getItem('SKM_UUID')){
        //genrate new UUID
        UUID = generateGuid()
        localStorage.setItem("SKM_UUID",UUID);
    }else{
        UUID = localStorage.getItem('SKM_UUID')
    }
    //check if modal already opened or closed by user 
    
    const overlay = document.createElement('div')
    const form = document.createElement('form')
    const container = document.createElement('div')
    const name = document.createElement('input')
    const email = document.createElement('input')
    const button = document.createElement('button')
    const boostrap = document.createElement('link')
    const h2 = document.createElement('h2')
    const span = document.createElement('span')
    form.setAttribute('method','post')
    form.setAttribute('action','http://localhost:3000/signup')
    form.setAttribute('style','width:400px;position:fixed;top:30%;left:30%;background:#ddd;padding:2rem;box-shadow:2px 2px 2px #ddd')
    container.setAttribute('style','width:100%;position: relative !important')
    name.setAttribute('style','width: 100%;padding: 12px 20px;margin: 8px 0;display: inline-block;border: 1px solid #ccc;border-radius: 4px;box-sizing: border-box')
    email.setAttribute('style','width: 100%;padding: 12px 20px;margin: 8px 0;display: inline-block;border: 1px solid #ccc;border-radius: 4px;box-sizing: border-box')
    button.setAttribute('style','width: 100%;background-color: #4CAF50;color: white;padding: 14px 20px;margin: 8px 0;border: none;border-radius: 4px;cursor: pointer;')
    button.setAttribute('type','submit')
    name.setAttribute('placeholder','name')
    email.setAttribute('placeholder','email')
    email.setAttribute('type','email')
    button.innerHTML = 'subscribe'
    h2.innerHTML = 'Subscribe to get notifed'
    span.innerHTML='x'
    span.setAttribute('style','position:absolute;right:0;top:-30px;font-weight:bold;font-size:20px;cursor:pointer')
    container.appendChild(h2)
    overlay.setAttribute('style','width: 100%;height: 100%;background: #484848bd;z-index: 99999;position: fixed;left: 0;top: 0;')
    document.body.appendChild(overlay)
    overlay.appendChild(form)
    form.appendChild(container)
    container.appendChild(name)
    container.appendChild(email)
    container.appendChild(button)
    container.appendChild(span)
    
    //notify system that modal opened
    
    fetch(`http://localhost:3000/ping?event=open&uuid=${UUID}`)
    
    
    button.addEventListener('click',(e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/signup?uuid=${UUID}&event=success`, {method: 'POST',headers: {'Accept': 'application/json','Content-Type': 'application/json'},body: JSON.stringify({name: name.value, email:email.value})})
        overlay.setAttribute('style','display:none')
        e.stopPropagation();
    })
    
    //notify system that modal closed 
    span.addEventListener('click',(e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/ping?event=close&uuid=${UUID}`)
        overlay.setAttribute('style','display:none')
        e.stopPropagation();
    })
    
    
    
    //this not recommended in production phase. there's plenty of packages for generate UUID
    function generateGuid() {
        var result, i, j;
        result = '';
        for(j=0; j<32; j++) {
          if( j == 8 || j == 12 || j == 16 || j == 20)
            result = result + '-';
          i = Math.floor(Math.random()*16).toString(16).toUpperCase();
          result = result + i;
        }
        return result;
    }
}
