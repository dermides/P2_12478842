import axios from "axios";

const API_KEY = "a9e832f34835ac9d4ab865a53df1ecf0";

async function getGeo(ip: string): Promise<string | null> {
    try {
        const response = await axios.get(`http://api.ipstack.com/${ip}?access_key=${API_KEY}`);
        return response.data.country_name;
    } catch (error) {
        console.error("Error obteniendo la ubicación:", error);
        return null;
    }
}

export default getGeo;

// Ejemplo de uso
//getCountryByIP("134.201.250.155").then(country => console.log("País:", country));