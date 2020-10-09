const fetch = require("node-fetch");
var HEROES=[];

/**
 * Función que permite obtener las auditorías relacionadas con el usuario ya sea lider auditor o miembro de alguna
 * auditoría.
 * @param {*} req recibe la solicitud GET en donde se puede acceder al _id del usuario después de verificar que el usuario
 * esta autenticado.
 * @param {*} res me permite responder, statusCode: 200 y un arrayJSON con la auditorías, si encuentra por lo menos una
 * auditoría asociada.
 * @param {*} next si ocurre un error, este parametro me permite enviarlo al manejador de errores de la app express
 * para que el error pueda ser visualizado
 */
exports.getHeroes = (req, res, next) => {
    const url = "https://www.superheroapi.com/api.php/3329612697092040/";
    return {
      dataHeroes: async () => {
        if (HEROES.length > 0) {
          console.log("no consulto");
          return res.json(HEROES);
        } else {
          console.log("consulto");
          var datos = [];
          for (let index = 1; index <= 10; index++) {
            try {
              const response = await fetch(`${url}${index}`);
              datos.push(response.json().data);
            } catch (err) {
              return res.send("error aqui" + err.message);
            }
          }
          HEROES = datos;
          console.log(datos);
          return res.json(HEROES);
        }
      },
    };
  };