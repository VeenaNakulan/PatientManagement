import instance from './instance';

export const getData = (url) => instance.get(url);
export const createData = (url, data) => instance.post(url, data);
export const updateData = (url, data) => instance.patch(url, data);
export const deleteDatas = (url) => instance.delete(url);
