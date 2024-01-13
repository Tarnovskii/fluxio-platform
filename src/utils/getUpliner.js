export const getUpliner = (store) => {
  let currentReferral
  const localReferral = localStorage.getItem("refAddress");

  if (store.AccountReducer.upline) currentReferral = store.AccountReducer.upline
  else if (localReferral) currentReferral = localReferral
  else currentReferral = store.ApplicationReducer.defaultReferrer

  return currentReferral
}
