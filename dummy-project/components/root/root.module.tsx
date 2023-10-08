import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from 'react'
import NewNavbar from "@/components/new-navbar/newnavbar.module";
import Sponsor from "@/components/Sponsor/sponsor.module";
import Header from "@/components/header/header.module";
import Footer from "@/components/footer/footer.module";
import Login from "@/components/login/login.module";
import { getDrawings, getNonProfits, getSponsors, postLoginCredentials, postSponsors } from "@/hooks/api";
import styles from "./root.module.css"
import ReactiveButton from "../reactive-button/reactive-button.module";
import Upload from "../upload/upload.module";
import SponsorCRUD from "../sponsors/sponsor.module";
import PdfViewer from "../PdfViewer/pdfviewer.module";

const Root = () => {
  const [formValue, setFormValue] = useState(
    {
      Organization: "",
      About: "",
      Logo: "",
      URL: "",
    }
  );

  const setFormValueMethod = (item: any) => {
      setFormValue(prevState => ({
        ...prevState,
        [item.target.name]: item.target.value
      }))
      console.log(item.target.value);
  };

  const submitOrganization = () => {
    postSponsors(formValue);

  }





	  // Login
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [loginData, setLoginData] = useState(
    {
      email: { value: "", isRequired: true, isInvalid: false },
      password: { value: "", isRequired: true, isInvalid: false },
    }
  );

  const updateLoginFormData = (item: any) => {
    const name = [item.target.name];
    setLoginData(prevState => (
      {
        ...prevState,
        [item.target.name]: {
          value: item.target.value,
          isRequired: loginData[item.target.name].isRequired,
          isInvalid: loginData[item.target.name].isInvalid
        }
      }
    ));
    console.log("loginData ==>", loginData);
  }

  const loginSubmit = () => {
    let isFValid = true;
    for (const key in loginData) {
      if (loginData[key].isRequired) {

        if (loginData[key].value === "") {
          console.log("invalid=>", key, loginData[key].value);
          setLoginData(prevState => (
            {
              ...prevState,
              [key]: {
                value: loginData[key].value,
                isRequired: loginData[key].isRequired, isInvalid: true
              }
            }
          ));
          isFValid = false;
  
        } else {
          console.log("valid=>", key);
          setLoginData(prevState => (
            {
              ...prevState,
              [key]: {
                value: loginData[key].value,
                isRequired: loginData[key].isRequired, isInvalid: false
              }
            }
          ));
        }
      }
    }
    if (isFValid) {
      login();
    }
    
  }

    const login = () => {
        
    postLoginCredentials(loginData)
      .then((response) => {
        console.log("response.responseData.token", response.access);
        setToken(response.access);
        setRole(response.authenticatedUser.role);
      })
      .catch((error) => {
        //handle error
        console.log("error while logging in = ", error.message);
      });
  }

  const logout = () => { 
    localStorage.setItem('suzieToken', ""); 
    localStorage.setItem('suzieRole', ""); 
    setToken("");
    setRole("");
    window.location.reload(false);
  }

  useEffect(() => {
    if (token) {
      localStorage.setItem('suzieToken', token); 
      localStorage.setItem('suzieRole', role);
    }
  }, [token]);

  useEffect(() => {
    const localStorageToken = localStorage.getItem('suzieToken');
    const localStorageRole = localStorage.getItem('suzieRole');
    if (localStorageToken && localStorageRole) {
      setToken(localStorageToken);
      setRole(localStorageRole);
    }
    console.log("getting token from local storage", );
  }, []);

  const createBook = () => {
    let drawingIds = getDrawings()

    
  }

  // useEffect(() => {
  //   getNonProfits(token)
  //   .then((banks) => {
  //     setBanksDropDown(banks);
  //     console.log("banks => ", banks);
  //   })
  //   .catch((e) => console.log(e))
  // }, []);
  let [currentStep, setCurrentStep] = useState(0);
  let page = [
    "",
    <Upload />,
    <PdfViewer/>,
    <SponsorCRUD setFormValueMethod={setFormValueMethod} formValue={formValue} onChange={submitOrganization}/>,
    ""
  ]

	return (
        <>
            <div className={styles.mainContainer}>
                {!token ?
          <Login loginData={loginData} updateLoginFormData={updateLoginFormData} onSubmit={loginSubmit} /> :
          


          <div className={styles.adminPanel}>
            <div className={styles.topBar}>
              <div className={styles.backBtn} onClick={()=>setCurrentStep(0)}>{currentStep == 0 ? "" : <>{"⬅"}</>}</div>
              <div className={styles.logout} onClick={logout}>logout</div>
            </div>

        { role == "1" ?
          
          currentStep==0 ? 
              
            <div className={styles.Menu}>
              <ReactiveButton class={styles.menuItem} title={"upload"} onClick={()=>setCurrentStep(1)}></ReactiveButton>
              <ReactiveButton class={styles.menuItem} title={"create book"} onClick={()=>setCurrentStep(2)}></ReactiveButton>
              <ReactiveButton class={styles.menuItem} title={"sponsors"} onClick={()=>setCurrentStep(3)}></ReactiveButton>
              <ReactiveButton class={styles.menuItem} title={"non-profits"} onClick={()=>setCurrentStep(4)}></ReactiveButton>
            </div> :
            <>
              {page[currentStep]}
              
            </> : <Sponsor></Sponsor>
        }
          </div>
                }
        </div>

		</>
	);
};

export default Root;
