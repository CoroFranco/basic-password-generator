const length = document.getElementById('length');
const showLength = document.getElementById('showLength');
const checkbox = document.querySelectorAll('.checkbox');
const generate = document.getElementById('generate')
const showPassword = document.getElementById('showPassword')

const allCharacters = {
    lowercase : 'abcdefghijklmnopqrstuvwxyz',
    uppercase : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers : '0123456789',
    symbols : '!@#$%^&*()_+[]{}|;:,.<>?'
}


console.log(checkbox[0].checked)

document.addEventListener('DOMContentLoaded', function(){
    showLength.textContent = `${length.value}`

    length.addEventListener('input', function()  {
        showLength.textContent = `${length.value}`
    })
    generate.addEventListener('click', generatePassword)
    
})




function generatePassword () {
    let password = '';
    let boxes = []
    let i =0;
    checkbox.forEach(function(checkbox){
        if(checkbox.checked === true){
            boxes.push (checkbox.value)
        }                                                       
    })    
    
    if (boxes.length === 0) {
        showPassword.textContent = 'Select at least one character type';
        return;
    }

    for(let i = 0; i < boxes.length; i++){
        password +=  allCharacters[boxes[i]][Math.floor(Math.random() * allCharacters[boxes[i]].length)]
    }
    
    

    for (let i = password.length; i < length.value; i++) {
        const randomType = boxes[Math.floor(Math.random() * boxes.length)];
        password += allCharacters[randomType][Math.floor(Math.random() * allCharacters[randomType].length)];
    }
    
    console.log(password)
    password = password.split('').sort(() => 0.5 - Math.random()).join('');
    showPassword.textContent = password;
}

document.getElementById('copy').addEventListener('click', function(){
    const textToCopy = showPassword.textContent;
    

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            console.log('Texto copiado al portapapeles');
        })
        .catch(err => {
            console.error('Error al copiar el texto: ', err);
        });
})
