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
    notas,
  } = userDB;

  const aaa = new Date(fecha_ingreso);
  const bbb = new Date(fecha_egreso);

  const fecha1 = new Date(aaa.getTime() + 18060000);
  const fecha2 = new Date(bbb.getTime() + 18060000);

  const pool = await getConnection();
  const sql = `INSERT INTO reservas (nombre,
    apellido,
    telefono,
    lugar,
    fecha_ingreso,
    fecha_egreso,
    importe_total,
    seña, notas) VALUES (?,?,?,?,?,?,?,?,?)`;
  const [reservas] = await pool.query(sql, [
    nombre,
    apellido,
    telefono,
    lugar,
    fecha1,
    fecha2,
    importe_total,
    seña,
    notas,
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
    notas,
  } = userDB;

  const aaa = new Date(fecha_ingreso);
  const bbb = new Date(fecha_egreso);

  const fecha1 = new Date(aaa.getTime() + 18060000);
  const fecha2 = new Date(bbb.getTime() + 18060000);

  const pool = await getConnection();
  const sql = `UPDATE reservas SET nombre=?,
      apellido=?,
      telefono=?,
      lugar=?,
      fecha_ingreso=?,
      fecha_egreso=?,
      importe_total=?,
      seña=?, notas=? WHERE id = ?`;
  const [reservas] = await pool.query(sql, [
    nombre,
    apellido,
    telefono,
    lugar,
    fecha1,
    fecha2,
    importe_total,
    seña,
    notas,
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
