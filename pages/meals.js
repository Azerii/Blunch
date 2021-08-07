import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import AddToCart from '../components/AddToCart'
import Button from '../components/Button'
import Container from '../components/Container'
import Dropdown from '../components/Dropdown'
import Layout from '../components/Layout'
import MealCard from '../components/MealCard'
import { tempMeals } from '../components/mockData'
import PreCheckout from '../components/PreCheckout'

const Wrapper = styled(Container)`

  >.content {
    width: 100%;
    height: calc(100vh - 19.2rem);
    display: grid;
    grid-template-columns: 1fr;
    overflow-y: auto;

    #preCheckout {
      display: none;
    }
  }

  @media screen and (min-width: 768px) {
    
    >.content {
      grid-template-columns: 2fr 1fr;
      grid-gap: 3.2rem;

      #preCheckout {
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

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 3.2rem;
    
    .title {
      grid-column: 1/3;
    }
  }
`

// const formatNumber = (num) => {
//   const formatter = new Intl.NumberFormat()
//   const toNum = Number(num);

//   return formatter.format(toNum);
// };

export default function Meals() {
  const [location, setLocation] = useState("Select your location");
  const router = useRouter();

  useEffect(() => {
    const user_location = localStorage.getItem("user_location");
    user_location && setLocation(user_location);
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <AddToCart />
      <PreCheckout />
      <Wrapper>
        <Header>
          <div className="inner">
            <Dropdown id="locationInput" className="locationInput" name="location" defaultValue={location} name="location" hasIcon icon="/map_pin.svg" readOnly />
            <Button className="change" text="Change" fullWidth onClick={() => router.push("/")} />
          </div>
        </Header>
        <div className="content">
          <div className="listing">
            {Object.keys(tempMeals).map(day => (
              <Section key={day}>
              <div className="title">
                <h3>{tempMeals[day]?.title}</h3>
              </div>
              {tempMeals[day]?.meals?.map(meal => (
                <MealCard key={meal.mealName} img={meal.img} mealName={meal.mealName} mealPrice={meal.mealPrice} />
              ))}
            </Section>
            ))}
          </div>
          <PreCheckout lg />
        </div>
      </Wrapper>
    </Layout>
  )
}
