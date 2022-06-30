export const predict = (body) => {
  console.log(body);
  let categories = [];
  for (let i = 0; i < 3; i++) {
    const rand = Math.floor(Math.random() * 2);
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
