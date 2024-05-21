const express = require('express')
const joyas = require('./data/joyas.js')
const app = express()

const { HATEOAS, filtroCategorias, fieldSelect, joya, orderValues } = require("./funciones.js")

app.listen(3000, () => console.log('Your app listening on port 3000'))

// 1. Crear una ruta GET /joyas que devuelva la estructura HATEOAS de todas las joyas 
// almacenadas en la base de datos. 
app.get("/api/v1/joyas", (req, res) => {
  // 6. Permitir hacer ordenamiento de las joyas según su valor de forma ascendente o 
  // descendente usando Query Strings.
  if (req.query.values == "asc") return res.send(orderValues("asc"))
  if (req.query.values == "desc") return res.send(orderValues("desc"))

  //5. Permitir hacer paginación de las joyas usando Query Strings.
  if (req.query.page) {
    const page = parseInt(req.query.page)
    const inicio = page * 2 - 2
    const fin = inicio + 2
    return res.send({ joyas: HATEOAS().slice(inicio, fin) })
  }

  res.send({
    joyas: HATEOAS(),
  })
})

// 2.  Crear una ruta GET /joyas/categoria/:categoria que devuelva solo las joyas 
// correspondientes a la categoría obtenida. 
app.get("/api/v1/categoria/:categoria", (req, res) => {
  const categoria = req.params.categoria;
  res.send({
    cant: filtroCategorias(categoria).length,
    joyas: filtroCategorias(categoria)
  });
});

// 3. Crear una ruta GET /joyas que permita el filtrado por campos de las joyas. 
app.get("/api/v1/joya/:id", (req, res) => {
  const id = parseInt(req.params.id)
  if (req.query.fields) return res.send(fieldSelect(joya(id)[0], req.query.fields))
  joya(id)[0]
    ? res.send({
      joya: joya(id)[0],
    })
    : res.send({
      error: "404 Not Found",
      message: "La joya que buscas no existe."
    })
})
