export const sortByName = <T extends { name: string | null }>(a: T, b: T) => {
  let nameA = a.name ? a.name : '';
  let nameB = b.name ? b.name : '';
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
};
