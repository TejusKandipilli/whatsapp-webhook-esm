import axios from "axios"
export async function getCat(){
  const response = await axios.get('https://cataas.com/cat/says/hello')
  return response.data
}