'use strict';


document.querySelector('.flex').addEventListener('submit', loadJokes);

function loadJokes(event) {

    event.preventDefault();

    const number = document.querySelector('#jokes-num').value;

    const xhr = new XMLHttpRequest();

    xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

    xhr.onload = function () {
        if (this.status == '200') {
            const response = JSON.parse(this.responseText);

            if (response.type == 'success') {
                let output = '';
                response.value.forEach(function (joke) {
                    output += `
                        <li>${joke.joke}</li>
                    `;
                });

                document.querySelector('#jokes-output').innerHTML = `
                    <ul class="mt-5">
                        ${output}
                    </ul>
                `;
            } else {
                document.querySelector('#jokes-output').innerHTML = '<h1 class="text-red-600 text-xl mt-5">Oops! something went wrong</h1>';
            }
        }
    };

    xhr.send();
}
