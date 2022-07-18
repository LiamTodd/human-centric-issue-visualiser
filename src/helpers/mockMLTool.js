export const predict = (body) => {
  const numberOfCategories = 3;
  let categories = [];
  for (let i = 0; i < numberOfCategories; i++) {
    const rand = Math.floor(Math.random() * 4); // 1/4 chance to be assigned each HCI tag
    if (rand == 1) {
      categories[i] = 1;
    } else {
      categories[i] = 0;
    }
  }
  let flag = false;
  for (let i = 0; i < categories.length; i++) {
    if (categories[i] == 1) {
      flag = true;
      break;
    }
  }
  if (flag) {
    categories.push(0);
  } else {
    categories.push(1);
  }
  return { categories: categories, confidence: Math.random().toPrecision(2) };
};
