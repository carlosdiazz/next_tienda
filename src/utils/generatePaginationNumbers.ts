//TODO Esto esta malo

//[1,2,3,4,...,20]
export const generatePagintionNumbers = (
  currentPage: number,
  totalPages: number
) => {
  //Si el numero total de paginas es 7 o menos se mostraran todas
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  //Si la pagina actual esta entre las priemras paginas => [1,2,3,...,10]
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  //Si la pagina actual esta entre las ultima paginas
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 1, totalPages];
  }

  //Si la pagina actual esta en otor lugar
  //Mostrar la primera pagina, puntos suspensivos, la pagina actual
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
