export const predict = (body) => {
  console.log(body);
  const numberOfCategories = 3;
  let categories = [];
  for (let i = 0; i < numberOfCategories; i++) {
    const rand = Math.floor(Math.random() * 8); // 1/8 chance to be assigned each HCI tag
    categories[i] = rand;
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
  return { categories: categories };
};
