import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '../components/Container';
import Layout from '../components/Layout';

const Wrapper = styled(Container)`
  width: 100%;
  padding-top: 10.8rem;
  padding-bottom: 4.8rem;
  display: grid;
  justify-content: center;
  grid-gap: 2.4rem;

  .prompt {
    font-weight: 700;
    margin-bottom: 1.6rem;
  }

  .imgWrapper {
    display: flex;
    justify-content: center;
  }

  .textWrapper {
    text-align: center;
  }

  @media screen and (min-width: 768px) {
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 6rem;
    align-items: center;

    .imgWrapper img {
      min-width: 48rem;
    }

    .textWrapper {
      text-align: left;
    }
  }
`

function parseQuery(queryString) {
  var query = {};
  var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}

const Order_successful = () => {
  const [render, setRender] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const { status } = parseQuery(window.location.search);
    if (status !== "success") {
      router.push("/review");
    } else {
      localStorage.removeItem("cart");
      localStorage.removeItem("delivery_info");
      setRender(true);
    }
    // esling-disable-next-line
  }, [])

  return (
    <>
    <Head>
      <title>Order successful</title>
      <meta name="description" content="Order successful" />
    </Head>
    <Layout>
      {render && <Wrapper>
        <div className="imgWrapper">
          <Image src="/order_success.svg" height="240px" width="240px" alt="Shopping bag" />
        </div>
        <div className="textWrapper">
          <h1 className="prompt">Order successful!</h1>
          <p>Your order has been received and will be<br />delivered on expected date of delivery.</p>
        </div>
      </Wrapper>}
    </Layout>
    </>
  )
}

export default Order_successful;