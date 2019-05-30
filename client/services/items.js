import * as api from '/services/api.js';

export const getItems = () => {
  return api.fetch({
    url: '/api/items',
  }).then(res => res.json());
};
