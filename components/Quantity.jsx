import { useState } from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import plusPrimary from "../public/plusPrimary.svg";
import plusLight from "../public/plusLight.svg";
import minusPrimary from "../public/minusPrimary.svg";
import minusLight from "../public/minusLight.svg";
import Image from "next/image";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 12rem;
  height: max-content;

  .row {
    display: flex;
    align-items: center;
  }

  label {
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    color: #334d6e50;
  }

  button {
    padding: 0.25rem;
    width: 3.2rem;
    aspect-ratio: 1/1;
    border: 2px solid ${props => props.light ? "var(--white)" : "var(--primary)"};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .2s ease-out;

    &:disabled {
      filter: var(--filter_grey);
    }
  }

  .iconWrapper {
    width: 3.2rem;
    aspect-ratio: 1/1;
    border-radius: 50%;
  }

  input {
    display: block;
    width: 3.75rem;
    height: 3rem;
    padding: 0 1.125rem;
    color: ${props => props.light ? "var(--white)" : "var(--text)"};
    border: none;
    text-align: center;
    background-color: transparent;
  }
`;

const Quantity = ({light, value = 1, setValue}) => {

  const increment = () => {
    value >= 1 && setValue(value + 1);
  };

  const decrement = () => {
    value > 1 && setValue(value - 1);
  };

  return (
    <Wrapper light={light}>
      <button
        className="row"
        onClick={() => decrement()}
        disabled={value <= 1}
      >
        {!light && <Image src={minusPrimary} alt="minus" className="icon" unoptimized priority />}
        {light && <Image src={minusLight} alt="minus" className="icon" unoptimized priority />}
      </button>
      <input
        id="quantity"
        type="number"
        name="quantity"
        value={value}
        readOnly
      />
      <button
        className="row"
        onClick={() => increment()}
      >
        {!light && <Image src={plusPrimary} alt="plus" className="icon" unoptimized priority />}
        {light && <Image src={plusLight} alt="plus" className="icon" unoptimized priority />}
      </button>
    </Wrapper>
  )
}

Quantity.propTypes = {
  light: PropTypes.bool,
  value: PropTypes.number,
  setValue: PropTypes.func
}

export default Quantity;