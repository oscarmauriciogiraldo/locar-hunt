window.onload = async () => {
    let testEntityAdded = false;

    // Simulación de API (Mock)
    /* const fetchMockData = async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    userId: 1,
                   //Coordenadas simuladas Casa Oscar
                    latitude: 4.8029365, 
                    longitude: -75.7342656 
                });
            }, 1000);
        });
    }; */

    // Obtener parámetros desde la URL
    const getQueryParams = () => {
        const params = new URLSearchParams(window.location.search);
        return {
            user: params.get("usr"),
            userId: params.get("uuid"),
            lat: params.get("lat"),
            lng: params.get("lng")
        };
    };

    const params = getQueryParams();
    console.log("Parámetros recibidos de la URL:", params);

    /* const data = await fetchMockData();
    console.log("Datos mockeados recibidos:", data); */

    // Fetch de API 
    const fetchApiData = async () => {
        try {
            const response = await fetch(`https://itssoluciones.co/tesoro/?lat=${params.lat}/&lng=${params.lng}/&usr=${params.user}/&uuid=${params.userId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al obtener datos de la API:", error);
            return null;
        }
    };

    const data = await fetchApiData();
    if (!data) return;

    const el = document.querySelector("[gps-new-camera]");

    el.addEventListener("gps-camera-update-position", e => {
        if(!testEntityAdded) {
            //alert(`Got first GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`);
            alert(`Got first GPS position: lon ${data.longitude} lat ${data.latitude}`);
           
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
                /* Calcula la ubicacion y pone el modelo en estas coordenadas */
                /* latitude: e.detail.position.latitude + 0.001,
                longitude: e.detail.position.longitude */
                latitude: data.latitude + 0.001,
                longitude: data.longitude
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