const container = document.getElementById("attractions-container");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

async function cargarAtracciones() {
    try {

        const response = await fetch(
            "https://api-colombia.com/api/v1/TouristicAttraction"
        );

        if (!response.ok) {
            throw new Error("Error al obtener los datos");
        }

        const attractions = await response.json();

        loading.style.display = "none";

        attractions.slice(0, 20).forEach(attraction => {

            const descripcion =
                attraction.description?.length > 350
                    ? attraction.description.substring(0, 350) + "..."
                    : attraction.description;

            container.innerHTML += `
                <article class="card">

                    <img
                        src="${attraction.images?.[0] || './img/atracciones.jpg'}"
                        alt="${attraction.name}"
                        onerror="this.src='./img/atraccion-default.jpg'"
                    >

                    <div class="card-content">

                        <h3>${attraction.name}</h3>

                        <p>
                            <strong>Ubicación:</strong>
                            ${attraction.city?.name || "No disponible"}
                        </p>

                        <p>
                            ${descripcion || "Sin descripción disponible."}
                        </p>

                    </div>

                </article>
            `;
        });

    } catch (err) {

        console.error(err);

        loading.style.display = "none";
        error.style.display = "block";
    }
}

cargarAtracciones();