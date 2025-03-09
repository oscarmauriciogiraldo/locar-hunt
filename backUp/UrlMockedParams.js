window.onload = () => {
    let testEntityAdded = false;

    // Función para obtener parámetros de la URL
    function getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            user: params.get("user") || "mockUser",
            userId: params.get("user-Id") || "12345",
            latitude: parseFloat(params.get("Latitud")) || 40.7128, // Coordenada de prueba
            longitude: parseFloat(params.get("Longitud")) || -74.0060 // Coordenada de prueba
        };
    }

    // Obtener parámetros (Mockeados o reales)
    const { user, userId, latitude, longitude } = getUrlParams();
    console.log(`User: ${user}, UserId: ${userId}, Lat: ${latitude}, Lon: ${longitude}`);

    const el = document.querySelector("[gps-new-camera]");

    el.addEventListener("gps-camera-update-position", (e) => {
        if (!testEntityAdded) {
            alert(`Got first GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`);
            
            // Añadir modelo en la ubicación recibida por URL o GPS
            const cofre = document.createElement("a-entity");
            cofre.setAttribute("scale", { x: 0.50, y: 0.50, z: 0.50 });
            cofre.setAttribute("position", { x: 0, y: -2, z: -8 });
            cofre.setAttribute("gltf-model", "./assets/cofre_zelda/scene.gltf");
            cofre.setAttribute("rotation", "40 0 0");
            cofre.setAttribute("animation-mixer", "");
            cofre.setAttribute("desaparecer-al-tocar", "");
            cofre.setAttribute("gps-new-entity-place", {
                latitude: latitude + 0.001,
                longitude: longitude
            });
            document.querySelector("a-scene").appendChild(cofre);

            // Segundo modelo
            const congratulations = document.createElement("a-entity");
            congratulations.setAttribute("id", "objeto-capturado");
            congratulations.setAttribute("scale", { x: 0.90, y: 0.90, z: 0.90 });
            congratulations.setAttribute("position", { x: 0, y: -10, z: -8 });
            congratulations.setAttribute("gltf-model", "./assets/popmii/scene.gltf");
            congratulations.setAttribute("animation-mixer", "");
            congratulations.setAttribute("visible", false);
            congratulations.setAttribute("gps-new-entity-place", {
                latitude: latitude + 0.001,
                longitude: longitude
            });
            document.querySelector("a-scene").appendChild(congratulations);
        }
        testEntityAdded = true;
    });
};
