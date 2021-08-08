import Image from 'next/image';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const DropdownWrapper = styled.div`
  width: 100%;
  position: relative;

  .locationInput {
    display: none;
  }

  .header {
    width: 100%;
    height: 4.8rem;
    border 1px solid var(--border_color);
    border-radius: 1rem;
    padding: 0 1.6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--sup_text);
    cursor: pointer;
  }

  .toggleIcon {
    height: 2rem;
    transition: transform .2s ease-out;
  }

  .list {
    width: 100%;
    position: absolute;
    top: 3rem;
    left: 0;
    padding: 2.4rem 0;
    background-color: var(--white);
    border-radius: 1rem;
    box-shadow: 0px 0px 5px var(--background);
    opacity: 0;
    pointer-events: none;
    transition: all .2s ease-out;
  }

  .listItem {
    width: 100%;
    height: 4.8rem;
    padding: 0 1.6rem;
    display: flex;
    align-items: center;
    color: var(--sup_text);
  }

  &.isOpen {
    .toggleIcon {
      transform: rotateZ(180deg);
    }

    .list {
      top: 6rem;
      opacity: 1;
      pointer-events: all;
    }
  }

  &.hasIcon {
    .header {
      justify-content: flex-start;
      
      .title {
        margin-left: 0.8rem;
      }
    }
  }
`

const Dropdown = ({className, name, value = "Select your location", setValue, list = ["Bodija", "Agbowo - UI", "General gas - Akobo", "Ikolaba"], hasIcon, icon, id, readOnly}) => {

  const toggleList = () => {
    if (readOnly) return;
    document.querySelector(`#${id}`).classList.toggle("isOpen");
  }

  const handleSelect = (e, l) => {
    e.preventDefault();
    e.stopPropagation();
    toggleList();
    setValue(l);
  }

  return (
    <DropdownWrapper id={id} className={`dWrapper${hasIcon ? " hasIcon" : ""} ${className ?? ""}`}>
      <div className="header" onClick={toggleList}>
        <input type="text" name={name} value={value} readOnly className="locationInput" />
        {hasIcon && icon && <Image src={icon} alt="icon" className="iconLeft" height="16" width="16" />}
        <p className="sup title">{value}</p>
        {!hasIcon && <Image src="/chevron_down.svg" height="16" width="16" alt="down" className="toggleIcon" />}
      </div>
      <div className="list">
        {list.map(item => <button key={item} className="listItem"onClick={(e) => handleSelect(e, item)}>{item}</button>)}
      </div>
    </DropdownWrapper>
  )
};

Dropdown.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  list: PropTypes.array,
  hasIcon: PropTypes.bool,
  icon: PropTypes.any,
  id: PropTypes.string.isRequired,
  readOnly: PropTypes.bool
}

export default Dropdown;