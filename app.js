const express = require("express");
const Joi = require("joi");
require("dotenv").config();
const cors = require("cors");
const {
  getReservas,
  insertNewReserva,
  deleteReserva,
  updateReserva,
} = require("./src/repositories/reservas");

const createJsonError = require("./src/errors/createJsonError");
const throwJsonError = require("./src/errors/throwJsonError");

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static("public"));

const { PORT } = process.env;

const port = PORT || 3000;

const schema = Joi.object().keys({
  nombre: Joi.string().min(1).max(120).required(),
  apellido: Joi.string().min(1).max(120).required(),
  telefono: Joi.string().min(1).max(20),
  lugar: Joi.valid("quinta", "san bernardo"),
  fecha_ingreso: Joi.date().required(),
  fecha_egreso: Joi.date().required(),
  importe_total: Joi.number().integer().positive().required(),
  seña: Joi.number().allow(null),
  notas: Joi.string().min(0).max(500),
});

/* app.post("/files", upload.single("avatar"), updateFile); */

app.get("/reservas", async (req, res) => {
  try {
    const reservas = await getReservas();

    if (!reservas) {
      throwJsonError(400, "Se produjo un error");
    }

    res.status(200);
    res.send(reservas);
  } catch (error) {
    createJsonError(error, res);
  }
});

app.post("/create", async (req, res) => {
  try {
    const { body } = req;

    await schema.validateAsync(body);

    const {
      nombre,
      apellido,
      telefono,
      lugar,
      fecha_ingreso,
      fecha_egreso,
      importe_total,
      seña,
      notas,
    } = body;

    console.log(notas);

    const userDB = {
      nombre,
      apellido,
      telefono,
      lugar,
      fecha_ingreso,
      fecha_egreso,
      importe_total,
      seña,
      notas,
    };

    const reservaId = await insertNewReserva(userDB);

    if (!reservaId) {
      throwJsonError("409", `Ocurrio un error`);
    }

    userDB.id = reservaId.insertId;

    res.status(201);
    res.send([userDB]);
  } catch (error) {
    createJsonError(error, res);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deleteReserva(id);

    if (deleted.affectedRows != 1) {
      throwJsonError(400, "No se ha podido eliminar la reserva");
    }

    res.status(200);
    res.send(`Reserva eliminada con exito`);
  } catch (error) {
    createJsonError(error, res);
  }
});

app.patch("/update/:id", async (req, res) => {
  try {
    const { body } = req;

    const { id } = req.params;

    await schema.validateAsync(body);

    const {
      nombre,
      apellido,
      telefono,
      lugar,
      fecha_ingreso,
      fecha_egreso,
      importe_total,
      seña,
      notas,
    } = body;

    console.log(body);

    const userDB = {
      nombre,
      apellido,
      telefono,
      lugar,
      fecha_ingreso,
      fecha_egreso,
      importe_total,
      seña,
      notas,
    };

    const reservaId = await updateReserva(userDB, id);
    console.log(reservaId);
    if (reservaId.affectedRows != 1) {
      throwJsonError("409", `Ocurrio un error`);
    }

    res.status(201);
    res.send([userDB]);
  } catch (error) {
    createJsonError(error, res);
  }
});

app.use((req, res) =>
  res.status(404).send({
    status: "error",
    message: "Not Found",
  })
);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
