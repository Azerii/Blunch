import PropTypes from 'prop-types';
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
    display: none;
  }
`;

const Content = styled.div`
  width: 100%;
  display: ${props => props.lg ? "none" : "flex"};
  flex-direction: column;
  background-color: ${props => props.lg ? "var(--text)" : "var(--white)"};
  border-radius: 24px 24px 0px 0px;
  padding-block: 2.4rem;
  position: absolute;
  bottom: 0;
  left: 0;
  overflow-y: auto;

  .header {
    width: 100%;
    position: relative;
    margin-bottom: 1.6rem;
    height: 2.4rem;
  }

  .closeBtn {
    width: 2.4rem;
    aspect-ratio: 1/1;
    position: absolute;
    top: 0;
    right: 2.4rem;
  }

  .subTotal {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.6rem 2.4rem;
    padding-top: 3.2rem;
  }

  .actionBtns {
    width: 100%;
    padding: 1.6rem 2.4rem;
  }

  @media screen and (min-width: 768px) {
    padding-bottom: 0;
    border-radius: 1rem;
    position: sticky;
    top: 0;
    width: 100%;
    max-height: 70vh;
    bottom: unset;
    left: unset;
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-end;
    color: var(--white);
    z-index: 2;

    .header {
      display: none;
    }

    .inner {
      height: -webkit-fill-available;
      overflow-y: auto;
    }

    .subTotal {
      position: sticky;
      bottom: 0;
      z-index: 1;
      background-color: var(--text);
      padding: 3.2rem 4.8rem;
      margin-top: 2.4rem;
      border-top: 1px solid var(--border_color);
    }

    .actionBtns {
      position: sticky;
      top: 0;
      z-index: 1;
      margin-top: 0;
      margin-bottom: 2.4rem;
      padding: 0 4.8rem;

      .btn {
        background-color: var(--white);
        color: var(--primary);
      }
    }
  }
`

const Order = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1.6rem;
  padding: 1.6rem 2.4rem;
  border-bottom: 1px solid var(--border_color);

  .removeBtn {
    color: var(--danger);
    text-decoration: underline;
    margin-top: 1.6rem;
  }

  .price {
    text-align: right;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 3fr 2fr;
    padding: 2.4rem 4.8rem;
    border-top: 1px solid var(--border_color);
    border-bottom: none;
  }
` 

const PreCheckout = ({lg}) => {
  const handleClose = (e) => {
    e.stopPropagation();
    document.querySelector("#preCheckout").classList.remove("open");
  }

  if (lg) {
    return (
      <Content lg>
        <div className="inner">
          <Order>
            <Quantity light />
            <div>
              <p className="sup mealName">Suya Stir Fry Noodles</p>
              <button className="small removeBtn"><span>Remove</span></button>
            </div>
            <div>
              <p className="price">NGN 1000</p>
            </div>
          </Order>
          <Order>
            <Quantity light />
            <div>
              <p className="sup mealName">Suya Stir Fry Noodles</p>
              <button className="small removeBtn"><span>Remove</span></button>
            </div>
            <div>
              <p className="price">NGN 1000</p>
            </div>
          </Order>
          <Order>
            <Quantity light />
            <div>
              <p className="sup mealName">Suya Stir Fry Noodles</p>
              <button className="small removeBtn"><span>Remove</span></button>
            </div>
            <div>
              <p className="price">NGN 1000</p>
            </div>
          </Order>
          <Order>
            <Quantity light />
            <div>
              <p className="sup mealName">Suya Stir Fry Noodles</p>
              <button className="small removeBtn"><span>Remove</span></button>
            </div>
            <div>
              <p className="price">NGN 1000</p>
            </div>
          </Order>
          <div className="subTotal">
            <span className="sup">Sub-total (1 meal)</span>
            <span className="sup">NGN 1000</span>
          </div>
        </div>
        <div className="actionBtns">
          <Button className="btn" text="Checkout" fullWidth  />
        </div>
      </Content>
    )
  }

  return (
    <Wrapper id="preCheckout">
      <Content className="content">
        <div className="header">
          <button className="closeBtn" onClick={handleClose}>
            <Image src={close} alt="close" />
          </button>
        </div>
        <div className="inner">
          <Order>
            <Quantity />
            <div>
              <p className="sup mealName">Suya Stir Fry Noodles</p>
              <button className="small removeBtn"><span>Remove</span></button>
            </div>
            <div>
              <p className="price">NGN 1000</p>
            </div>
          </Order>
          <Order>
            <Quantity />
            <div>
              <p className="sup mealName">Suya Stir Fry Noodles</p>
              <button className="small removeBtn"><span>Remove</span></button>
            </div>
            <div>
              <p className="price">NGN 1000</p>
            </div>
          </Order>
          <div className="subTotal">
            <span className="sup">Sub-total (1 meal)</span>
            <span className="sup">NGN 1000</span>
          </div>
        </div>
        <div className="actionBtns">
          <Button className="btn" text="Checkout" fullWidth  />
        </div>
      </Content>
    </Wrapper>
  )
}

PreCheckout.propTypes = {
  lg: PropTypes.bool
}

export default PreCheckout;

