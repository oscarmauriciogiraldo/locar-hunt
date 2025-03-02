import LocAR from 'locar';
console.log('hola mundo')
document.addEventListener('DOMContentLoaded', () => {
    // 2. Inicializar LocAR.js
    const locAR = new LocAR({
        onLocationUpdate: (coords) => {
            console.log('Ubicación actual en mi casa:', coords);
            checkProximity(coords);
        }
    });
    
});