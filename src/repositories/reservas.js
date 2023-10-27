const { getConnection } = require("../infraestructure/database");

const getReservas = async () => {
  const pool = await getConnection();
  const sql = `SELECT *  FROM reservas`;
  const [reservas] = await pool.query(sql);

  return reservas;
};

const deleteReserva = async (id) => {
  const pool = await getConnection();
  const sql = `DELETE FROM reservas where id = ?`;
  const [deleted] = await pool.query(sql, [id]);

  return deleted;
};

const insertNewReserva = async (userDB) => {
  const {
    nombre,
    apellido,
    telefono,
    lugar,
    fecha_ingreso,
    fecha_egreso,
    importe_total,
    seña,
  } = userDB;

  const pool = await getConnection();
  const sql = `INSERT INTO reservas (nombre,
    apellido,
    telefono,
    lugar,
    fecha_ingreso,
    fecha_egreso,
    importe_total,
    seña) VALUES (?,?,?,?,?,?,?,?)`;
  const [reservas] = await pool.query(sql, [
    nombre,
    apellido,
    telefono,
    lugar,
    fecha_ingreso,
    fecha_egreso,
    importe_total,
    seña,
  ]);

  return reservas;
};

const updateReserva = async (userDB, id) => {
  const {
    nombre,
    apellido,
    telefono,
    lugar,
    fecha_ingreso,
    fecha_egreso,
    importe_total,
    seña,
  } = userDB;

  const pool = await getConnection();
  const sql = `UPDATE reservas SET nombre=?,
      apellido=?,
      telefono=?,
      lugar=?,
      fecha_ingreso=?,
      fecha_egreso=?,
      importe_total=?,
      seña=? WHERE id = ?`;
  const [reservas] = await pool.query(sql, [
    nombre,
    apellido,
    telefono,
    lugar,
    fecha_ingreso,
    fecha_egreso,
    importe_total,
    seña,
    id,
  ]);

  return reservas;
};

module.exports = {
  getReservas,
  insertNewReserva,
  deleteReserva,
  updateReserva,
};
