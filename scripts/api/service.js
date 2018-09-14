import 'babel-polyfill';
import fetch from 'node-fetch';

const getImages = async (page, limit, order) => {
  const url = `https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${page}&_sort=title&_order=${order}`;
  const response = await fetch(url);
  const json = await response.json();
  return json.map(element => ({
    id: element.id,
    title: element.title,
    url: element.url,
    thumbnailUrl: element.thumbnailUrl
  }));
};

export default getImages;
