// 1. Configuración básica con Vite, A-Frame y LocAR.js
import 'aframe';
import LocAR from 'locar';

document.addEventListener('DOMContentLoaded', () => {
    // 2. Inicializar LocAR.js
    const locAR = new LocAR({
        onLocationUpdate: (coords) => {
            console.log('Ubicación actual:', coords);
            checkProximity(coords);
        }
    });
    
    locAR.start();
    
    // 3. Simulación de API con datos mockeados
    const mockApiResponse = {
        uid: '1234',
        location: { latitude: 40.7128, longitude: -74.0060 } // Ejemplo (Nueva York)
    };
    const targetLocation = mockApiResponse.location;
    
    function checkProximity(coords) {
        const distance = getDistance(coords, targetLocation);
        if (distance < 10) { // Si el usuario está a menos de 10m
            document.getElementById('interaction-btn').style.display = 'block';
        }
    }
    
    function getDistance(coord1, coord2) {
        const R = 6371e3;
        const lat1 = coord1.latitude * Math.PI / 180;
        const lat2 = coord2.latitude * Math.PI / 180;
        const deltaLat = (coord2.latitude - coord1.latitude) * Math.PI / 180;
        const deltaLon = (coord2.longitude - coord1.longitude) * Math.PI / 180;
        
        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
                  Math.cos(lat1) * Math.cos(lat2) *
                  Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
    
    // 4. Manejo de interacción
    let objectCollected = false;
    document.getElementById('interaction-btn').addEventListener('click', () => {
        objectCollected = true;
        console.log('Objeto recogido:', objectCollected);
    });
    
    // 5. Configuración de A-Frame
    /* const scene = document.createElement('a-scene');
    scene.innerHTML = `
      <a-assets>
        <a-assets-item id="cofre" src="assets/cofre_zelda/scene.gltf"></a-assets-item>
      </a-assets>
      <a-entity id="tesoro" gltf-model="#cofre" scale="0.02 0.02 0.02" position="0 -2 -3" rotation="30 0 0" animation-mixer></a-entity>
    `;
    document.body.appendChild(scene); */
});
