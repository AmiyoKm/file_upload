

export const thirtyDaysFromNow =()=> {
  const today = new Date();
  return new Date(today.setDate(today.getDate() + 30));
}