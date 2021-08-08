import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import AlertBox from '../components/AlertBox';
import Button from '../components/Button'
import Dropdown from '../components/Dropdown';
import Layout from '../components/Layout';

const Wrapper = styled.div`
  height: 100vh;
  overflow-y: auto;

  .text1 {
    font-size: 32px;
    font-weight: 400;
    line-height: 40px;
  }

  .text2 {
    color: var(--primary);
  }

  .text3 {
    color: var(--sup_text);
    margin-top: 1.2rem;
    font-weight: 300;
  }

  form {
    margin-top: 4.8rem;
  }

  .dropdown {
    margin-bottom: 1.6rem;
  }

  .contentLeft {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 2.4rem;
  }

  .contentRight {
    display: none;
  }

  @media screen and (min-width: 768px) {
    display: flex;

    .contentLeft {
      width: 50%;
      padding: 0 4.8rem;
    }

    .contentRight {
      width: 50%;
      display: block;
      position: relative;
    }

    .text1, .text2 {
      font-size: 72px;
      line-height: 80px;
    }

    .text3 {
      font-size: 26px;
      line-height: 36px;
    }

    form {
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-gap: 1.6rem;
    }

    .bg {
      height: 100%;
      width: calc(60% + 2.4rem);
      background-color: var(--primary);
      position: absolute;
      top: 0;
      right: 0;
      z-index: 0;
    }

    .meal {
      position: absolute;
      top: 50%;
      right: 30%;
      transform: translateY(-50%);
      z-index: 1;
    }
  }
`

export default function Home() {
  const [alertText, setAlertText] = useState("");
  const [success, setSuccess] = useState(false);
  const [location, setLocation] = useState("Select your location");
  const router = useRouter();

  const showAlert = (msg = "...", _success = false) => {
    // e.preventDefault();
    setSuccess(_success);
    setAlertText(msg);

    document.querySelector(".alertBox").classList.add("show");
    setTimeout(
      () => document.querySelector(".alertBox").classList.remove("show"),
      3000
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const location = document.querySelector(".locationInput").value;
    const locations = ["Bodija", "Agbowo - UI", "General gas - Akobo", "Ikolaba"];

    if (locations.includes(location)) {
      localStorage.setItem("user_location", location);
      router.push("/meals");
    } else {
      showAlert("Please select a location", false);
    }
    
  }
  return (
    <>
      <Head>
        <title>Blunch</title>
        <meta name="description" content="Breakfast at your doorstep" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Wrapper>
          <AlertBox className="alertBox" success={success} text={alertText} />
          <div className="contentLeft">
            <h1 className="text1">Welcome to</h1>
            <h1 className="text2">Blunch.ng</h1>
            <h5 className="text3">Breakfast at your doorstep</h5>
            <form onSubmit={handleSubmit}>
              <Dropdown id="locationInput" name="location" className="dropdown" value={location} setValue={setLocation} />
              <Button text="View meals" fullWidth />
            </form>
          </div>
          <div className="contentRight">
            <div className="bg"></div>
            <div className="meal">
              <Image src="/indexMeal.svg" alt="Indomie and Suya Stir fry" height="480px" width="452px" />
            </div>
          </div>
        </Wrapper>
      </Layout>
    </>
  )
}