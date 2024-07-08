// Primer paso trabajamos en la clase Customer
class Customer {
    // Definimos el constructor para la clase
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    // Creamos la propieda info para retornar el nombre y email del cliente
    get info() {
        return `${this.name} (${this.email})`;
    }
}

// Segundo paso trabajamos en la clase Reservation
class Reservation {
    // Definimos el constructor para la clase
    constructor(id, customer, date, guests) {
        this.id = id;
        this.customer = customer;
        this.date = new Date(date);
        this.guests = guests;
    }
    // Definimos la propiedad info para mostrar los datos de las reservas realizadas
    get info() {
        return `Date: ${this.date.toLocaleString()}, Customer: ${this.customer.info}, Guests: ${this.guests}`;
    }
    // Metodo para validar que la reserva sea correcta, tanto en fecha como en cantidad de personas
    static validateReservation(date, guests) {
        const reservationDate = new Date(date);
        const currentDate = new Date();
        return reservationDate > currentDate && guests > 0;
    }
}

class Restaurant {
    constructor(name) {
        this.name = name;
        this.reservations = [];
    }

    addReservation(reservation) {
        this.reservations.push(reservation);
    }

    render() {
        const container = document.getElementById("reservations-list");
        container.innerHTML = "";
        this.reservations.forEach((reservation) => {
            const reservationCard = document.createElement("div");
            reservationCard.className = "box";
            reservationCard.innerHTML = `
                    <p class="subtitle has-text-primary">
                        Reserva ${
                            reservation.id
                        } - ${reservation.date.toLocaleString()}
                    </p>
                    <div class="card-content">
                        <div class="content">
                            <p>
                                ${reservation.info}
                            </p>
                        </div>
                    </div>
              `;
            container.appendChild(reservationCard);
        });
    }
}

document
    .getElementById("reservation-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const customerName = document.getElementById("customer-name").value;
        const customerEmail = document.getElementById("customer-email").value;
        const reservationDate =
            document.getElementById("reservation-date").value;
        const guests = parseInt(document.getElementById("guests").value);

        if (Reservation.validateReservation(reservationDate, guests)) {
            const customerId = restaurant.reservations.length + 1;
            const reservationId = restaurant.reservations.length + 1;

            const customer = new Customer(
                customerId,
                customerName,
                customerEmail
            );
            const reservation = new Reservation(
                reservationId,
                customer,
                reservationDate,
                guests
            );

            restaurant.addReservation(reservation);
            restaurant.render();
        } else {
            alert("Datos de reserva inválidos");
            return;
        }
    });

const restaurant = new Restaurant("El Lojal Kolinar");

const customer1 = new Customer(1, "Shallan Davar", "shallan@gmail.com");
const reservation1 = new Reservation(1, customer1, "2024-12-31T20:00:00", 4);

if (Reservation.validateReservation(reservation1.date, reservation1.guests)) {
    restaurant.addReservation(reservation1);
    restaurant.render();
} else {
    alert("Datos de reserva inválidos");
}
