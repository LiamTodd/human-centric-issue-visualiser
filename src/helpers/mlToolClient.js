const urlBase = 'https://humancentricse.pythonanywhere.com/';

export const predict = async (comments) => {
  let url = urlBase + '?';
  let i;
  for (i = 0; i < comments.length; i++) {
    url += 'comment=' + comments[i];
    if (i < comments.length - 1) {
      url += '&';
    }
  }

  const response = await fetch(url, {
    method: 'POST'
  });
  return response.json();
};
