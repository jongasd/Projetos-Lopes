// Verifica se já existe container, se não, cria
if (!document.getElementById('toast-container')) {
    const container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
}

function showToast(title, message, type = 'default') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = '🔔';
    if(type === 'success') icon = '✅';
    if(type === 'error') icon = '❌';

    toast.innerHTML = `<div>${icon}</div><div><strong>${title}</strong><br><small>${message}</small></div>`;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}