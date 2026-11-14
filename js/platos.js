const container = document.getElementById("dishes-container");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

async function cargarPlatos() {

    try {

        const response = await fetch(
            "https://api-colombia.com/api/v1/TypicalDish"
        );

        if (!response.ok) {
            throw new Error("Error al obtener los datos");
        }

        const dishes = await response.json();

        loading.style.display = "none";

        dishes.slice(0, 20).forEach(dish => {

            const descripcion =
                dish.description?.length > 350
                    ? dish.description.substring(0, 350) + "..."
                    : dish.description;

            container.innerHTML += `
                <article class="card">

                    <img
                        src="${dish.imageUrl || './img/plato-default.jpg'}"
                        alt="${dish.name}"
                        onerror="this.src='./img/plato-default.jpg'"
                    >

                    <div class="card-content">

                        <h3>${dish.name}</h3>

                        <p>
                            <strong>Departamento:</strong>
                            ${dish.department?.name || "No disponible"}
                        </p>

                        <p>
                            <strong>Ingredientes:</strong>
                            ${dish.ingredients || "No disponibles"}
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

cargarPlatos();