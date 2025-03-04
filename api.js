export const fetchMockData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                userId: "afe123",
                latitude: 4.8029365,
                longitude: -75.7342656
            });
        }, 1000); // Simula un tiempo de respuesta de 1 segundo
    });
};
