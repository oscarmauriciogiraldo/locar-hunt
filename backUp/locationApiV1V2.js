// Función para obtener parámetros de la URL
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        user: params.get("user") || "testUser",
        userId: params.get("user-Id") || "12345",
        latitude: parseFloat(params.get("Latitud")) || 37.7749,
        longitude: parseFloat(params.get("Longitud")) || -122.4194
    };
}

// Version 1: Mockeada (simulando API)
function getMockedData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                user: "mockUser",
                userId: "99999",
                latitude: 40.7128,
                longitude: -74.0060
            });
        }, 1000);
    });
}

// Version 2: Consumiendo API
async function fetchDataFromApi(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener datos de la API:", error);
        return null;
    }
}

window.onload = async () => {
    let testEntityAdded = false;
    let apiUrl = "https://api.example.com/getLocationData"; // Reemplaza con la URL real de la API
    
    // Obtener datos (Mockeados o desde API)
    let params = getUrlParams();
    let apiData = await fetchDataFromApi(apiUrl);
    let data = apiData || await getMockedData();

    console.log("Datos obtenidos:", data);
    
    const el = document.querySelector("[gps-new-camera]");

    el.addEventListener("gps-camera-update-position", (e) => {
        if (!testEntityAdded) {
            alert(`Recibidos: Usuario: ${data.user}, ID: ${data.userId}, Latitud: ${data.latitude}, Longitud: ${data.longitude}`);

            const cofre = document.createElement("a-entity");
            cofre.setAttribute("scale", "0.5 0.5 0.5");
            cofre.setAttribute("position", "0 -2 -8");
            cofre.setAttribute("gltf-model", "./assets/cofre_zelda/scene.gltf");
            cofre.setAttribute("rotation", "40 0 0");
            cofre.setAttribute("animation-mixer", "");
            cofre.setAttribute("gps-new-entity-place", {
                latitude: data.latitude + 0.001,
                longitude: data.longitude
            });
            document.querySelector("a-scene").appendChild(cofre);

            testEntityAdded = true;
        }
    });
};
