import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Container from '../components/Container';
import FormGroup from '../components/FormGroup';
import Layout from '../components/Layout';

const Wrapper = styled(Container)`
  display: flex:
  flex-direction: column;
  padding-top: 10.8rem;
  padding-bottom: 4.8rem;

  .heading {
    text-align: center;
    margin-bottom: 4.8rem;
  }

  form {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 2.4rem;

    .btn {
      margin-top: 4.8rem;
    }
  }

  @media screen and (min-width: 768px) {
    form {
      width: 40%;
      margin: auto;
    }
  }
`;

const formDataToJSON = (formData) => {
  let object = {};

  formData.forEach((value, key) => {
    // Reflect.has in favor of: object.hasOwnProperty(key)
    if (!Reflect.has(object, key)) {
      object[key] = value;
      return;
    }
    if (!Array.isArray(object[key])) {
      object[key] = [object[key]];
    }
    object[key].push(value);
  });

  return object;
};

const Delivery_info = () => {
  const router = useRouter();
  const [deliveryInfo, setDeliveryInfo] = useState(false);

  const handleSubmit = (e) => {
    let formEl;
    if (e) {
      e.preventDefault();
      formEl = e.target;
    } else {
      formEl = document.querySelector("#delivery_info");
    }

    const formData = new FormData(formEl);
    const data = formDataToJSON(formData);

    localStorage.setItem("delivery_info", JSON.stringify(data));

    router.push("/review");
  }

  useEffect(()=> {
    const delivery_info = localStorage.getItem("delivery_info");
    delivery_info && setDeliveryInfo(JSON.parse(delivery_info));
    // eslint-disable-next-line
  }, []);

  return (
    <>
    <Head>
      <title>Delivery info</title>
      <meta name="description" content="Customer delivery information" />
    </Head>
    <Layout>
      <Wrapper id="delivery_info">
        <h1 className="heading">Delivery information</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup
            fieldStyle="shortText"
            inputType="text"
            name="name"
            placeholder="Full name"
            defaultValue={deliveryInfo.name}
          />
          <FormGroup
            fieldStyle="shortText"
            inputType="number"
            name="phone"
            placeholder="Phone number"
            defaultValue={deliveryInfo.phone}
          />
          <FormGroup
            fieldStyle="shortText"
            inputType="email"
            name="email"
            placeholder="Email address"
            defaultValue={deliveryInfo.email}
          />
          <FormGroup
            fieldStyle="shortText"
            inputType="text"
            name="delivery_address"
            placeholder="Delivery address"
            defaultValue={deliveryInfo.delivery_address}
          />
          <FormGroup
            fieldStyle="longText"
            inputType="text"
            name="instructions"
            placeholder="Instructions (Optional)"
            required={false}
            defaultValue={deliveryInfo.instructions}
          />
          <Button
            type="submit"
            text="Next"
            fullWidth
            className="btn"
          />
        </form>
      </Wrapper>
    </Layout>
  </>
  )
}

export default Delivery_info;