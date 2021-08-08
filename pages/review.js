import { useRouter } from 'next/dist/client/router';
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

  .content {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 4.8rem;
  }

  .lg {
    display: none;
  }

  @media screen and (min-width: 768px) {
    .heading {
      margin-bottom: 1.6rem;
    }

    .content {
      width: 90%;
      margin: auto;
      grid-template-columns: 2fr 1fr;
      grid-gap: 10.8rem;
    }

    .mb {
      display: none
    }

    .lg {
      display: block;
    }
  }
`

const Review = () => {
  const router = useRouter();
  const [details, setDetails] = useState(false);

  const makeOrder = (e) => {
    
    router.push("/review");
  }

  useEffect(() => {
    const cart = localStorage.getItem("cart");

    cart && setDetails(JSON.parse(cart));
    // eslint-disable-next-line
  }, [])
  return (
    <Layout>
      <Wrapper id="review">
        <h2 className="heading">Review orders</h2>
        {details && <div className="content">
          <div className="cart">
            <div className="summation">
              <div className="small subTotal">
                <span></span>
                <span></span>
              </div>
              <div className="small deliveryFee">
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="small total">
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="info">
            <div className="group">
              <h5 className="title"></h5>
              <p></p>
              <p></p>
              <p></p>
            </div>
            <div className="group">
              <h5 className="title"></h5>
              <p></p>
              <p></p>
              <p></p>
            </div>
            <Button text="Make payment" className="btn" fullWidth />
          </div>
        </div>}
      </Wrapper>
    </Layout>
  )
}

export default Review;