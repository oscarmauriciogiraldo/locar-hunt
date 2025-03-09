window.onload = () => {
    let testEntityAdded = false;

    // Simulación de parámetros recibidos desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get("user") || "mockUser";
    const userId = urlParams.get("user-Id") || "1234";
    const latitude = parseFloat(urlParams.get("Latitud")) || 40.7128; // Coordenada mockeada
    const longitude = parseFloat(urlParams.get("Longitud")) || -74.0060; // Coordenada mockeada

    console.log(`Usuario: ${user}, ID: ${userId}, Latitud: ${latitude}, Longitud: ${longitude}`);

    const el = document.querySelector("[gps-new-camera]");

    el.addEventListener("gps-camera-update-position", e => {
        if (!testEntityAdded) {
            alert(`Got first GPS position: lon ${longitude} lat ${latitude}`);

            /* Añadir modelo en función de la ubicación recibida */
            const cofre = document.createElement('a-entity');
            cofre.setAttribute("scale", "0.50 0.50 0.50");
            cofre.setAttribute('gltf-model', './assets/cofre_zelda/scene.gltf');
            cofre.setAttribute('rotation', '40 0 0');
            cofre.setAttribute('animation-mixer', '');
            cofre.setAttribute('gps-new-entity-place', {
                latitude: latitude + 0.001,
                longitude: longitude
            });
            document.querySelector("a-scene").appendChild(cofre);

            /* Segundo modelo */
            const congratulations = document.createElement('a-entity');
            congratulations.setAttribute("scale", "0.90 0.90 0.90");
            congratulations.setAttribute('gltf-model', './assets/popmii/scene.gltf');
            congratulations.setAttribute('animation-mixer', '');
            congratulations.setAttribute('visible', false);
            congratulations.setAttribute('gps-new-entity-place', {
                latitude: latitude + 0.001,
                longitude: longitude
            });
            document.querySelector("a-scene").appendChild(congratulations);
        }
        testEntityAdded = true;
    });
};
