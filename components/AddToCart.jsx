import Image from 'next/image';
import styled from 'styled-components';
import close from '../public/close.svg';
import Button from './Button';
import Quantity from './Quantity';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: #00000020;
  backdrop-filter: blur(10px);
  opacity: 0;
  pointer-events: none;
  transition: all .1s ease-out;
  z-index: 5;

  .content {
    bottom: -100%;
    transition: all .2s ease-out .1s;
  }

  &.open {
    opacity: 1;
    pointer-events: all;

    .content {
      bottom: 0;
    }
  }

  @media screen and (min-width: 768px) {
    display: flex;
    align-items: center;
    padding: 2.4rem;

    &.open .content, .content {
      bottom: unset;
    }
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--white);
  border-radius: 24px 24px 0px 0px;
  padding: 2.4rem;
  position: absolute;
  bottom: 0;
  left: 0;

  .header {
    width: 100%;
    position: relative;
    margin-bottom: 3.2rem;

    h4 {
      color: #14142B;
      width: 70%;
    }
  }

  .closeBtn {
    width: 2.4rem;
    aspect-ratio: 1/1;
    position: absolute;
    top: 0;
    right: 0;
  }

  .imgWrapper {
    width: 100%;
    height: 26.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 0.5rem;
    margin-bottom: 3.2rem;

    img {
      width: 100%;
    }
  }

  .actionBtns {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1.6rem;
    margin-top: 3.2rem;
  }

  @media screen and (min-width: 768px) {
    padding: 4.8rem;
    border-radius: 2.4rem;
    position: relative;
    width: 40%;
    margin: auto;
    bottom: unset;
    left: unset;

    .header {
      margin-bottom: 4.8rem;
    }

    .imgWrapper {
      margin-bottom: 4.8rem;
    }

    .actionBtns {
      width: 80%;
      grid-template-columns: 1fr 1fr;
      grid-gap: 4.8rem;
      margin-top: 4.8rem;
    }
  }
`

const AddToCart = () => {

  const handleClose = (e) => {
    e.stopPropagation();
    document.querySelector("#addToCart").classList.remove("open");
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    document.querySelector("#addToCart").classList.remove("open");
    document.querySelector("#preCheckout").classList.add("open");
  };

  return (
    <Wrapper id="addToCart">
      <Content className="content">
        <div className="header">
          <h4>Chicken Stirfry Noodles</h4>
          <button className="closeBtn" onClick={handleClose}>
            <Image src={close} alt="close" />
          </button>
        </div>
        <div className="imgWrapper">
          <img src="/temp_meal.png" alt="meal"  />
        </div>
        <Quantity />
        <div className="actionBtns">
          <Button text="Cancel" className="bordered" fullWidth  />
          <Button text="Add to cart" fullWidth onClick={handleAddToCart}  />
        </div>
      </Content>
    </Wrapper>
  )
}

export default AddToCart;

