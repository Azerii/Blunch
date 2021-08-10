import PropTypes from 'prop-types';
import Image from 'next/image';
import styled from 'styled-components';
import Button from './Button';
import { useEffect, useState } from 'react';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 1.6rem;
  padding: 1.6rem;
  background-color: var(--background);
  border-radius: 1rem;

  .imgWrapper {
    width: 100%;
    height: 9.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 0.5rem;

    img {
      max-width: unset !important;
      min-width: unset !important;
      height: unset !important;
      width: unset !important;
      left: 50% !important;
      transform: translateX(-50%);
    }
  }

  .mealName {
    margin-bottom: 0.8rem;
  }

  .mealPrice {
    color: #4f4f4f;
  }

  .btn {
    height: 3rem;
    width: 9.6rem;
    padding: 0.5rem;
    margin-top: 1.6rem;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: center;
  }

  @media screen and (min-width: 768px) {
    padding: 2.4rem;
    grid-template-columns: 10rem 2fr;
    grid-gap: 2.4rem;

    .imgWrapper {
      height: 10rem;
      border-radius: 0.8rem;
    }

    .btn {
      height: 4.8rem;
      width: 14.4rem;
    }
  }
`

const formatNumber = (num) => {
  const formatter = new Intl.NumberFormat()
  const toNum = Number(num);

  return formatter.format(toNum);
};

// const days = {
//   "monday": 1,
//   "tuesday": 2,
//   "wednesday": 3,
//   "thursday": 4,
//   "friday": 5,
// }

const MealCard = (props) => {
  const { name, price, day, handleMealSelect } = props;
  const [canAdd, setCanAdd] = useState(true);

  const canAddToCart = (id, day) => {
    const _date = new Date();
    const _day = _date.getDay();
    const _hours = _date.getHours();
    const cart = JSON.parse(localStorage.getItem("cart"));
    const isInCart = cart.some(item => item.id === id && item.pivot.day_id === day);
    const isValidDay = day >= _day;
    const isPastTime = day === day && _hours >= 14
    
    return !isInCart && isValidDay && !isPastTime;
  }

  const handleClick = (e) => {
    e.stopPropagation();

    let selected_meal = {
      ...props,
      day,
      quantity: 1
    }

    localStorage.setItem("selected_meal", JSON.stringify(selected_meal));

    handleMealSelect && handleMealSelect();
  }

  useEffect(() => {
    setCanAdd(canAddToCart(props.id, props.pivot.day_id));
    // eslint-disable-next-line
  }, [props.orders])

  return (
    <Wrapper>
      <div className="imgWrapper">
        <Image src={`/menu/${name}.jpg`} alt={name} width={100} height={100} unoptimized priority />
      </div>
      <div className="content">
        <h4 className="mealName fontBold">{name}</h4>
        <p className="sup mealPrice fontRegular">NGN {formatNumber(price)}</p>
        <Button className="btn sup" text="Add to cart" onClick={handleClick} disabled={!canAdd} />
      </div>
    </Wrapper>
  )
}

MealCard.propTypes = {
  photo: PropTypes.any,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  day: PropTypes.string,
  handleMealSelect: PropTypes.func
}

export default MealCard;