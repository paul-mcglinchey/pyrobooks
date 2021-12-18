import endpoints from '../config/endpoints';
import Userfront from '@userfront/core';

const addNewClient = async (values, setMessage, setHasMessage, setFailed, setIsLoading, getClients) => {

  setIsLoading(true);
  setMessage('Loading');
  setHasMessage(true);
  setFailed(false);

  fetch((endpoints.clients), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Userfront.tokens.accessToken}`
    },
    body: JSON.stringify(values)
  })
    .then(res => res.json())
    .then(
      (result) => {
        if (result.message) {
          setMessage(result.message);
          setFailed(true);
        } else if (result.success) {
          setMessage(result.success);
          setFailed(false);
        }
        setIsLoading(false);
      }
    )
    .catch(
      (error) => {
        setIsLoading(false);
        setFailed(true);
        console.log(error.message);
      }
    )
  
  getClients();
}

export default addNewClient;