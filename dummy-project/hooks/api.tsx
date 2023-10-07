import axios from 'axios';
import { getToken } from './authentication';

const baseURL = "https://smartlos.arthsetu.in/api";

export const getAllProjects = async (token: any) => {
  const URL = `${baseURL}/allProject`;
  let projects = await axios.get(
    URL,
    {
      params: {"token": token},
      headers: {}
    }
  );
  console.log("projects.data.responseData", projects.data.responseData)
  return projects.data.responseData;
//   return [
//         {
//             "id": 1,
//             "name": "Sai Nakshatra Trrident",
//             "status": true,
//             "createdAt": "2022-04-30 15:34:57",
//             "updatedAt": "2022-04-30 15:34:57",
//             "organizationId": 1
//     },
//     ]
}