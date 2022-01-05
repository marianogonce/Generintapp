export let currencyFormat = (monto) => {
  return new Intl.NumberFormat("es-AR", {
    currency: "ARS",
    style: "currency",
  }).format(monto.toFixed(2));
};
