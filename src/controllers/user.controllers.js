const catchError = require("../utils/catchError");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendMail");
require("dotenv").config();


const getAll = catchError(async(req, res) => {
    const results = await User.findAll();
    return res.json(results);
});

const getAllActive = catchError(async(req, res) => {
  const results = await User.findAll({where: {status: true}});
  return res.json(results);
});


const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    await User.update( {status: !result.status}, { where: {id} });
    return res.sendStatus(204);
});


// ENDPOINT DE USUARIO 1 --- CREAR USUARIO CLIENTE
const create = catchError(async (req, res) => {
  const result = await User.create(req.body);
  const tokenToVerify = jwt.sign({ result }, process.env.TOKEN_SECRET, {
    expiresIn: "24h",
  });
  await sendEmail({
    to: result.email,
    subject: "Verificación de Email",
    html: `
    <a href="${req.body.frontBaseUrl}/verify_email/${tokenToVerify}">Click en el enlace para verificar E-mail</a>
    `,
  });
  return res.status(201).json(result);
});


// ENDPOINT DE USUARIO 2 --- ACTUALIZAR USUARIO CLIENTE
const update = catchError(async (req, res) => {
  const { id } = req.params;
  const { password, status, isVerified, ...rest } = req.body;

  const result = await User.update(
    rest, { where: { id }, returning: true });
    if (result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
  });


module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    getAllActive
}
