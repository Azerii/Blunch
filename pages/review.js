import axios from 'axios';
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

  .content, .info {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 4.8rem;
  }

  .info .group {
    display: grid;
    grid-gap: 1.6rem;

    .title {
      font-weight: 700;
    }
  }

  .order {
    display: grid;
    grid-template-columns: 1fr 3fr 2fr;
    align-items: center;
    grid-gap: 1.6rem;
    padding-block: 1.6rem;

    .quantity, .mealName, .price {
      font-weight: 700;
    }

    .price {
      text-align: right;
    }
  }

  .summation {
    padding-block: 1.6rem;
    display: grid;
    grid-gap: 1.6rem;
    border-top: 1px solid var(--border_color);
    border-bottom: 1px solid var(--border_color);

    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  .total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.6rem;
  }

  .actionBtns {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1.6rem;
    margin-top: 3.2rem;
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

    .order {
      grid-template-columns: 1fr 3fr 2fr;
      padding: 2.4rem 4.8rem;
      border-bottom: none;
    }

    .actionBtns {
      width: 40%;
      margin: auto;
      grid-template-columns: 1fr 1fr;
      grid-gap: 4.8rem;
      margin-top: 4.8rem;
    }

    .mb {
      display: none
    }

    .lg {
      display: block;
    }
  }
`

const formatNumber = (num) => {
  const formatter = new Intl.NumberFormat()
  const toNum = Number(num);

  return formatter.format(toNum);
};

const Review = () => {
  const router = useRouter();
  const [orders, setOrders] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState(false)
  const [location, setLocation] = useState(false);
  const [loading, setLoading] = useState(false);

  const makeOrder = async (e) => {
    const url = 'https://order.blunch.ng/api/order'
    const meals = orders.map(order => ({
      id: order.id,
      quantity: order.quantity,
      day_id: order.pivot.day_id,
      date: (new Date()).toLocaleDateString()
    }));
    const user_location = localStorage.getItem("user_location");

    const location_id = user_location?.id;

    setLoading(true);

    const res = await axios.post(`${url}?name=${deliveryInfo.name}&phone=${deliveryInfo.phone}&location_id=${location_id}&email=${deliveryInfo.email}&address=${deliveryInfo.delivery_address}`, {meals})

    setLoading (false);

    if (res.data.status === "success") {

    }
  }

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    const delivery_info = localStorage.getItem("delivery_info");
    const user_location = localStorage.getItem("user_location");

    cart && setOrders(JSON.parse(cart));
    delivery_info && setDeliveryInfo(JSON.parse(delivery_info));
    user_location && setLocation(JSON.parse(user_location).name);
    // eslint-disable-next-line
  }, [])

  return (
    <Layout>
      <Wrapper id="review">
        <h2 className="heading">Review orders</h2>
        {orders && deliveryInfo && <div className="content">
          <div className="cart">
            {orders.map((order, index) => (
              <div key={`${index}${order.id}`} className="order">
                <div>
                  <h4 className="quantity">{order.quantity}</h4>
                </div>
                <div>
                  <h5 className="mealName">{order.name}</h5>
                </div>
                <div>
                  <p className="price">NGN {formatNumber(order.total)}</p>
                </div>
              </div>
            ))}
            <div className="summation">
              <div className="small item">
                <span>Sub-total ({orders.length} order{orders.length > 1 ? "s" : ""})</span>
                <span>NGN {formatNumber(orders.reduce((a, b) => a + b.total, 0))}</span>
              </div>
              <div className="small item">
                <span>Delivery fee</span>
                <span>NGN 400</span>
              </div>
            </div>
            <div className="sup total">
              <span>Total</span>
              <span>NGN {formatNumber(orders.reduce((a, b) => a + b.total, 400))}</span>
            </div>
          </div>
          <div className="info">
            <div className="group">
              <h5 className="title">Customer information</h5>
              <p>{deliveryInfo?.name}</p>
              <p>{deliveryInfo?.email}</p>
              <p>{deliveryInfo?.phone}</p>
            </div>
            <div className="group">
              <h5 className="title">Delivery information</h5>
              <p>{location}</p>
              <p>{deliveryInfo?.delivery_address}</p>
              <p>{deliveryInfo?.instructions}</p>
            </div>
          </div>
        </div>}
        <div className="actionBtns">
            <Button text="Add more items" className="bordered" fullWidth onClick={() => router.push("/meals")}  />
            <Button text="Make payment" fullWidth onClick={makeOrder} loading={loading} />
          </div>
      </Wrapper>
    </Layout>
  )
}

export default Review;