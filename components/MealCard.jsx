import PropTypes from 'prop-types';
import Image from 'next/image';
import styled from 'styled-components';
import Button from './Button';

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
    dispay: flex;
    justify-content: center;
    align-items: center;
    oveflow: hidden;
    border-radius: 0.5rem;
  }

  .mealName {
    max-width: 70%;
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
      width: 20rem;
    }
  }
`

const MealCard = ({img, mealName, mealPrice}) => {
  const handleClick = (e) => {
    e.stopPropagation();
    document.querySelector("#addToCart").classList.add("open");
  }
  return (
    <Wrapper>
      <div className="imgWrapper">
        {img && <Image src={img} alt={mealName} height="100px" width="100px" />}
      </div>
      <div className="content">
        <h4 className="mealName">{mealName}</h4>
        <p className="sup mealPrice">NGN {mealPrice}</p>
        <Button className="btn sup" text="Add to cart" onClick={handleClick} />
      </div>
    </Wrapper>
  )
}

MealCard.propTypes = {
  img: PropTypes.any,
  mealName: PropTypes.string.isRequired,
  mealPrice: PropTypes.string.isRequired
}

export default MealCard;