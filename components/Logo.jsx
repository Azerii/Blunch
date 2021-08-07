import styled from "styled-components";
import PropTypes from "prop-types";
import Image from "next/image";
import logo from "../public/logo.svg";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;

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
    <Wrapper className={className}>
      <Image src={logo} alt="Blunch" className="logo" width="40px" height="48px" />
    </Wrapper>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
