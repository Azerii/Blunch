import axios from 'axios'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import AddToCart from '../components/AddToCart'
import Button from '../components/Button'
import Container from '../components/Container'
import Dropdown from '../components/Dropdown'
import Layout from '../components/Layout'
import MealCard from '../components/MealCard'
import PreCheckout from '../components/Cart'

const Wrapper = styled(Container)`
  padding-bottom: 10.8rem;

  >.content {
    width: 100%;
    height: calc(100vh - 19.2rem);
    display: grid;
    grid-template-columns: 1fr;
    overflow-y: auto;

    #cart {
      display: none;
    }
  }

  @media screen and (min-width: 768px) {
    padding-bottom: unset;

    >.content {
      grid-template-columns: 2fr 1fr;
      grid-gap: 3.2rem;
      padding-bottom: unset;

      #cart {
        display: block;
      }
    }
`

const Header = styled.div`
  position: sticky;
  top: 0;
  padding-top: 10.8rem;
  padding-bottom: 4.8rem;

  .inner {
    display: flex;
    position: relative;
  }

  .change {
    position: absolute;
    right: 0;
    top: 0;
    width: 30%;
    z-index: 1;
  }

  @media screen and (min-width: 768px) {
    .inner {
      max-width: 32.7rem;
    }
  }
`

const Section = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2.4rem;
  margin: 3.2rem 0;

  .title {
    text-transform: capitalize;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 3.2rem;
    
    .title {
      grid-column: 1/3;
    }
  }
`

const CartPreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 7.2rem;
  width: 100vw;
  background-color: var(--text);
  padding: 0 1.6rem;
  border-radius: 2rem;
  position: fixed;
  bottom: 0;
  color: var(--white);

  .btn {
    background-color: var(--white);
    color: var(--text);
    width: 10.8rem;
    font-weight: 400;
  }

  @media screen and (min-width: 768px) {
    display: none;
  }
`

const formatNumber = (num) => {
  const formatter = new Intl.NumberFormat()
  const toNum = Number(num);

  return formatter.format(toNum);
};

export default function Meals({ menu }) {
  const [location, setLocation] = useState("...");
  const [selectedMeal, setSelectedMeal] = useState(false);
  const [orders, setOrders] = useState(false);

  const router = useRouter();

  const handleMealSelect = () => {
    const menu = JSON.parse(localStorage.getItem("menu"));
    const selected_meal = JSON.parse(localStorage.getItem("selected_meal"));

    const mealData = menu[selected_meal.day].find(meal => meal.id === selected_meal.id);

    mealData && setSelectedMeal(mealData);
    document.querySelector("#addToCart").classList.add("open");
  }

  useEffect(() => {
    const user_location = localStorage.getItem("user_location");
    let cart;

    if (!localStorage.getItem("cart")) {
      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart))
    }

    cart = JSON.parse(localStorage.getItem("cart"));
    
    setOrders(cart.reverse());

    user_location && setLocation(JSON.parse(user_location).name);
    menu && localStorage.setItem("menu", JSON.stringify(menu));
    // eslint-disable-next-line
  }, [location]);

  return (
    <Layout>
      {!!orders.length && <CartPreview>
        <p>{orders.length} order{orders.length > 1 ? "s" : ""} - NGN {formatNumber(orders.reduce((a, b) => a + b.total, 0))}</p>
        <Button className="btn" text="View cart" onClick={() => document.querySelector("#cart").classList.add("open")} />
      </CartPreview>}
      <AddToCart content={selectedMeal} setOrders={setOrders} />
      <PreCheckout orders={orders} setOrders={setOrders} />
      <Wrapper>
        <Header>
          <div className="inner">
            <Dropdown id="locationInput" className="locationInput" name="location" setValue={setLocation} value={location} hasIcon icon="/map_pin.svg" readOnly />
            <Button className="change" text="Change" fullWidth onClick={() => router.push("/")} />
          </div>
        </Header>
        <div className="content">
          <div className="listing">
            {menu && Object.keys(menu).map(day => (
              <Section key={day}>
              <div className="title">
                <h3>{day}</h3>
              </div>
              {menu[day]?.map((meal, index) => (
                <MealCard key={`${index}${meal.id}`} {...meal} day={day} handleMealSelect={handleMealSelect} />
              ))}
            </Section>
            ))}
          </div>
          <PreCheckout lg orders={orders}setOrders={setOrders} />
        </div>
      </Wrapper>
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await axios.get('https://order.blunch.ng/api/menu');
  const menu = res.data;

  if (menu) delete menu.status;

  if (!menu) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      menu
    }
  }
}