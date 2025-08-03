document.addEventListener('DOMContentLoaded', () => {
    // Carrega o header
    fetch('/components/html/header.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
        })
        .catch(error => console.error('ECONX Component Loader: Erro ao carregar o header:', error));

    // Carrega o footer
    fetch('/components/html/footer.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
        })
        .catch(error => console.error('ECONX Component Loader: Erro ao carregar o footer:', error));
});