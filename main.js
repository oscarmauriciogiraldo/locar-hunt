window.onload = () => {
    let testEntityAdded = false;

    const el = document.querySelector("[gps-new-camera]");

    el.addEventListener("gps-camera-update-position", e => {
        if(!testEntityAdded) {
            alert(`Got first GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`);

            /* Add a model to the nort of the initial GPS position */
            const entity = document.createElement('a-entity')
            /* Atributos modelo */
            entity.setAttribute("scale", {
                x: 0.50, 
                y: 0.50,
                z: 0.50
            });
            entity.setAttribute('position', {
                x: 0,
                y: -2,
                z: -8
            });
            entity.setAttribute('gltf-model', './assets/cofre_zelda/scene.gltf');
            entity.setAttribute('rotation', '40 0 0');
            entity.setAttribute('animation-mixer', '');
            entity.setAttribute('desaparecer-al-tocar', '');
            entity.setAttribute('gps-new-entity-place', {
                latitude: e.detail.position.latitude + 0.001,
                longitude: e.detail.position.longitude
            });
            document.querySelector("a-scene").appendChild(entity);

            
        }
        testEntityAdded = true;
    });
};