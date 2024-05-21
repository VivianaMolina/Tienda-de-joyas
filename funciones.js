const joyas = require("./data/joyas.js");

const HATEOAS = () => {
    const data = joyas.results.map((e) => {
        return {
            name: e.name,
            href: `http://localhost:3000/api/v1/joya/${e.id}`,
        }
    })
    return data;
};

const filtroCategorias = (categoria) => {
    return joyas.results.filter((e) => {
        return e.category === categoria
    })
}

const joya = (id) => {
    return joyas.results.filter((e) => e.id === id)
}
const fieldSelect = (joya, fields) => {
    const Fields = fields.split(',');
    const properties = Object.keys(joya);
    const check = true

    Fields.forEach((field) => {
        if (!properties.includes(field)) check = false
    })

    if (!check) {
        return { error: "400 bad Request", message: "Alguno de los campos que quieres consultar no existe" }
    } else {
        for (field in joya) {
            if (!Fields.includes(field)) delete joya[field]
        }
        return joya;
    }
}

const orderValues = (order) => {
    if (order == "asc") return joyas.results.sort((a, b) => (a.value > b.value ? 1 : -1))
    if (order == "desc") return joyas.results.sort((a, b) => (a.value < b.value ? 1 : -1))
}

module.exports = { HATEOAS, filtroCategorias, fieldSelect, joya, orderValues }