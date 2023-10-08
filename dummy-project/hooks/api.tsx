import axios from 'axios';
// import { getToken } from './authentication';

// const baseURL = "http://127.0.0.1:8080/api";
const baseURL = "http://204.236.243.72:8000/api";

export const postLoginCredentials = async (loginData: any) => {
  console.log("postLoginCredentials")
  const URL = `${baseURL}/login`;
   const data = {
        "email":loginData.email.value,
        "password":loginData.password.value
    }
    const res = await axios({
        method: "post",
        url: URL,
        timeout: 1000 * 5,
        headers: {
            "Accept": "application/json",
        },
        data: data,
        params: {}
    })
  console.log(res)
  return res.data;
  // return "token";
}

export const getNonProfits = async () => {
  // const nonProfitsURL = `${baseURL}/api/nonprofits`;
  // let response = await axios.get(
  //   nonProfitsURL,
  //   {
  //     params: {},
  //     headers: {}
  //   }
  // );
  // console.log("response.data.responseData", response.data)
  // return response.data;
  return {
    "count": 5,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 1,
            "name": "Charity: Water",
            "about": null,
            "url": "https://pbxt.replicate.delivery/slwfP9Un21TMfUDIupiu3tEMhGlaSkegDjF6xX2SDWl6flvGB/output_1.png",
            "created_on": "2023-10-08T09:58:53.398254Z",
            "modified_on": "2023-10-08T09:58:53.398301Z"
        },
        {
            "id": 2,
            "name": "Charity: Air",
            "about": null,
            "url": "https://pbxt.replicate.delivery/slwfP9Un21TMfUDIupiu3tEMhGlaSkegDjF6xX2SDWl6flvGB/output_1.png",
            "created_on": "2023-10-08T09:58:57.274943Z",
            "modified_on": "2023-10-08T09:58:57.274963Z"
        },
        {
            "id": 3,
            "name": "Charity: Land",
            "about": null,
            "url": "https://pbxt.replicate.delivery/slwfP9Un21TMfUDIupiu3tEMhGlaSkegDjF6xX2SDWl6flvGB/output_1.png",
            "created_on": "2023-10-08T09:58:59.916310Z",
            "modified_on": "2023-10-08T09:58:59.916372Z"
        },
        {
            "id": 4,
            "name": "Charity: Sea",
            "about": null,
            "url": "https://pbxt.replicate.delivery/slwfP9Un21TMfUDIupiu3tEMhGlaSkegDjF6xX2SDWl6flvGB/output_1.png",
            "created_on": "2023-10-08T09:59:02.904971Z",
            "modified_on": "2023-10-08T09:59:02.905065Z"
        },
        {
            "id": 5,
            "name": "Charity: galaxy",
            "about": null,
            "url": "https://pbxt.replicate.delivery/slwfP9Un21TMfUDIupiu3tEMhGlaSkegDjF6xX2SDWl6flvGB/output_1.png",
            "created_on": "2023-10-08T09:59:09.301134Z",
            "modified_on": "2023-10-08T09:59:09.301233Z"
        }
    ]
}
}

export const getSponsors = async () => {
  // const nonProfitsURL = `${baseURL}/api/nonprofits`;
  // let response = await axios.get(
  //   nonProfitsURL,
  //   {
  //     params: {},
  //     headers: {}
  //   }
  // );
  // console.log("response.data.responseData", response.data)
  // return response.data;
  return {
    "count": 4,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 1,
            "name": "Google",
            "about": null,
            "logo": null,
            "url": null,
            "created_on": "2023-10-08T01:29:31.074409Z",
            "modified_on": "2023-10-08T01:29:31.074475Z"
        },
        {
            "id": 2,
            "name": "Amazon",
            "about": null,
            "logo": null,
            "url": null,
            "created_on": "2023-10-08T01:29:36.476561Z",
            "modified_on": "2023-10-08T01:29:36.476615Z"
        },
        {
            "id": 3,
            "name": "Apple",
            "about": null,
            "logo": null,
            "url": null,
            "created_on": "2023-10-08T01:29:42.562685Z",
            "modified_on": "2023-10-08T01:29:42.562764Z"
        },
        {
            "id": 4,
            "name": "Meta",
            "about": null,
            "logo": null,
            "url": null,
            "created_on": "2023-10-08T01:29:47.494941Z",
            "modified_on": "2023-10-08T01:29:47.495037Z"
        }
    ]
}
}

export const postSponsors = async (Formdata: any) => {
  console.log("postLoginCredentials")
  const URL = `${baseURL}/sponsors/`;
   const data = {
        "name":Formdata.Organization,
        "about": Formdata.About,
        "logo": Formdata.Logo,
        "url": Formdata.URL
   }
    const res = await axios({
        method: "post",
        url: URL,
        timeout: 1000 * 5,
        headers: {},
        data: data,
        params: {}
    })
  console.log(res)
  return res.data;
  // return "token";
}


export const getDrawings = async () => {
    const URL = `${baseURL}/drawings`;
    let response = await axios.get(
        URL,
        {
        params: {},
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000', 'Access-Control-Allow-Credentials': 'true'}
        }
    );
    console.log("response.data.responseData", response.data)
    return response.data;
  // return "token";
}

