document.addEventListener('DOMContentLoaded', () => {
    const components = [
        'https://cdn.metadax.com.br/components/html/header.html',
        'https://cdn.metadax.com.br/components/html/footer.html',
        'https://cdn.metadax.com.br/components/html/back-to-top.html',
        'https://cdn.metadax.com.br/components/html/privacy-banner.html',
        'https://cdn.metadax.com.br/components/html/new-info.html'
    ];

    const loadComponent = (url, position = 'beforeend') => {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                document.body.insertAdjacentHTML(position, data);
            })
            .catch(error => console.error(`METADAX Component Loader: Erro ao carregar o componente de ${url}:`, error));
    };

    // Carrega o header no início do body
    loadComponent(components[0], 'afterbegin');

    // Carrega os demais componentes no final do body
    components.slice(1).forEach(componentUrl => {
        loadComponent(componentUrl);
    });
});