import data from "./data";

// se crea un nuevo array de las categorías de los productos
const allCategories = [
  "Todas",
  ...new Set(data.map((product) => product.category)),
];

// variable que filtra las categorías que no tienen subcategorías
export const sinSubcategory = allCategories.filter(
  (category) =>
    category !== "Lubricantes" &&
    category !== "Disfraces" &&
    category !== "Lenceria"
);

// división de subcategorías de lubricantes
const lubricantes = data.filter(
  (product) => product.category === "Lubricantes"
);

export const subLubricantes = [
  "Todas",
  ...new Set(lubricantes.map((lubricante) => lubricante.subcategory)),
];

// división de subcategorías de disfraces
const disfraces = data.filter((product) => product.category === "Disfraces");

export const subDisfraces = [
  "Todas",
  ...new Set(disfraces.map((disfraz) => disfraz.subcategory)),
];

// división de subcategorías de lencería
const lenceria = data.filter((product) => product.category === "Lenceria");

export const subLenceria = [
  "Todas",
  ...new Set(lenceria.map((lenc) => lenc.subcategory)),
];
