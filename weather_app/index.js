async function GetWeather() {
    try {
        const zipCode = document.getElementById("zip_code").value.trim();
        const weatherInfo = document.getElementById("forecast");
        const location = document.getElementById("location");
        const responseBox = document.getElementById("response");

        //if the ZIP code fails the regex
        if (!/^\d{5}$/.test(zipCode)) {
            alert("Please enter a valid 5-digit ZIP code.");
            return;
        }

        //clear the response box
        responseBox.style.display = "none";

        // Get location data from ZIP code
        const zipResponse = await fetch(
            `https://api.zippopotam.us/us/${zipCode}`
        );

        //if there was an issue converting ZIP code to coordinates
        if (!zipResponse.ok) {
            throw new Error("Error fetching ZIP code information.");
        }

        const zipData = await zipResponse.json();

        if (!zipData.places || zipData.places.length === 0) {
            throw new Error("No location found for that ZIP code.");
        }

        const latitude = zipData.places[0].latitude;
        const longitude = zipData.places[0].longitude;

        // Get NWS forecast URL
        const pointsResponse = await fetch(
            `https://api.weather.gov/points/${latitude},${longitude}`
        );

        if (!pointsResponse.ok) {
            throw new Error("Could not fetch weather data.");
        }

        const pointsData = await pointsResponse.json();

        const forecastResponse = await fetch(
            pointsData.properties.forecast
        );

        if (!forecastResponse.ok) {
            throw new Error("Could not fetch forecast.");
        }

        const forecastData = await forecastResponse.json();

        const city = pointsData.properties.relativeLocation.properties.city;
        const state = pointsData.properties.relativeLocation.properties.state;

        if (!forecastData.properties.periods?.length) {
            throw new Error("No forecast information available.");
        }

        // Display forecast
        location.textContent = `${city}, ${state}`;
        weatherInfo.textContent = forecastData.properties.periods[0].detailedForecast;

        responseBox.style.display = "block";

    } catch (error) {
        console.error(error);
        alert("Unable to retrieve the weather. Please try again.");
    }
}