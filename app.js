const btn = document.querySelector('#button');
const msg = document.querySelector('#message');

btn.onclick = function() {
    const promise = new Promise((resolve, reject) => {

        const request = new XMLHttpRequest;
        request.open('GET', 'http://api.icndb.com/jokes/random');
        request.onload = () => {
            if (request.status === 200) {
                resolve(request.response);
            } else {
                reject(Error(request.statusText));
            }
        };

        request.onerror = () => {
            reject(Error('Error fetching data'));
        }

        request.send();

    });

    promise.then((data) => {
            console.log('Got data! Promise Executed');
            const result = JSON.parse(data).value.joke;
            msg.innerHTML = result;
        },
        (error) => {
            console.log('Promise rejected');
            console.log(error.message);
        });
}