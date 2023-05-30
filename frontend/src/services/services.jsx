import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getContacts = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const addContact = (dataObj) => {
  const request = axios.post(baseUrl, dataObj);
  return request.then(response => response.data);
}

const updateContact = (id, dataObj) => {
  const request = axios.put(`${baseUrl}/${id}`, dataObj);
  return request.then(response => response.data);
}

const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response.data)
}

export default {getContacts, addContact, updateContact, deleteContact};