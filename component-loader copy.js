document.addEventListener('DOMContentLoaded', () => {
    // Carrega o header
    fetch('https://cdn.metadax.com.br/components/html/header.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
        })
        .catch(error => console.error('METADAX Component Loader: Erro ao carregar o header:', error));

    // Carrega o footer
    fetch('https://cdn.metadax.com.br/components/html/footer.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
        })
        .catch(error => console.error('METADAX Component Loader: Erro ao carregar o footer:', error));
});