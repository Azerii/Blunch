import styled from "styled-components";
import PropTypes from "prop-types";
import Image from "next/image";
import logo from "../public/logo.svg";

const Wrapper = styled.a`
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;

  .logo {
    min-height: 3.2rem !important;
  }

  @media screen and (min-width: 768px) {
    .logo {
      min-height: 4.8rem !important;
    }
  }
`;

const Logo = ({ className }) => {
  return (
    <Wrapper href="/" className={className}>
      <Image src={logo} alt="Blunch" className="logo" width={40} height={48} unoptimized priority />
    </Wrapper>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
