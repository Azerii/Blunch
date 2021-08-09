import { useRouter } from 'next/dist/client/router';
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
  return (
    <Layout>
      <Wrapper id="delivery_info">
        <h2 className="heading">Delivery information</h2>
        <form onSubmit={handleSubmit}>
          <FormGroup
            fieldStyle="shortText"
            inputType="text"
            name="name"
            placeholder="Full name"
          />
          <FormGroup
            fieldStyle="shortText"
            inputType="number"
            name="phone"
            placeholder="Phone number"
          />
          <FormGroup
            fieldStyle="shortText"
            inputType="email"
            name="email"
            placeholder="Email address"
          />
          <FormGroup
            fieldStyle="shortText"
            inputType="text"
            name="delivery_address"
            placeholder="Delivery address"
          />
          <FormGroup
            fieldStyle="longText"
            inputType="text"
            name="instructions"
            placeholder="Instructions (Optional)"
            required={false}
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
  )
}

export default Delivery_info;