import { fetchMockData } from "./api.js";

window.onload = () => {
    let testEntityAdded = false;

    const el = document.querySelector("[gps-new-camera]");

    el.addEventListener("gps-camera-update-position", e => {
        if(!testEntityAdded) {
            alert(`Got first GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`);
           /*  const mockData = {
                userId,
                latitude: e.detail.position.latitude, 
                longitude: e.detail.position.longitude,
            }; */
            /* Add a model to the nort of the initial GPS position */
            const cofre = document.createElement('a-entity')
            /* Atributos modelo */
            cofre.setAttribute("scale", {
                x: 0.50, 
                y: 0.50,
                z: 0.50
            });
            cofre.setAttribute('position', {
                x: 0,
                y: -2,
                z: -8
            });
            cofre.setAttribute('gltf-model', './assets/cofre_zelda/scene.gltf');
            cofre.setAttribute('rotation', '40 0 0');
            cofre.setAttribute('animation-mixer', '');
            cofre.setAttribute('desaparecer-al-tocar', '');
            cofre.setAttribute('gps-new-entity-place', {
                latitude: e.detail.position.latitude + 0.001,
                longitude: e.detail.position.longitude
                /* latitude: mockData.latitude + 0.001,
                longitude: mockData.longitude */
            });
            document.querySelector("a-scene").appendChild(cofre);

            /*  ***** segundo modelo ******* */
            const congratulations = document.createElement('a-entity')
            congratulations.setAttribute('id', 'objeto-capturado');
            congratulations.setAttribute("scale", {
                x: 0.90, 
                y: 0.90,
                z: 0.90
            });
            congratulations.setAttribute('position', {
                x: 0,
                y: -10,
                z: -8
            });
            congratulations.setAttribute('gltf-model', './assets/popmii/scene.gltf');
            congratulations.setAttribute('animation-mixer', '');
            congratulations.setAttribute('visible', false);
            congratulations.setAttribute('gps-new-entity-place', {
                latitude: e.detail.position.latitude + 0.001,
                longitude: e.detail.position.longitude
                
            });
            document.querySelector("a-scene").appendChild(congratulations);
        }
        testEntityAdded = true;
    });

    
};