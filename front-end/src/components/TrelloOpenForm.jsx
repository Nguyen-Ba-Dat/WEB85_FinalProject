import PropTypes from 'prop-types';
import { Icon } from "@mui/material";
import styled from "styled-components";

const OpenFormButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 3px;
  height: 36px;
  margin-left: 8px;
  width: 300px;
  padding-left: 10px;
  padding-right: 10px;
  opacity: ${props => props.opacity};
  color: ${props => props.color};
  background-color: ${props => props.backgroundColor};
`;

const TrelloOpenForm = ({ list, children, onClick }) => {
  const buttonTextOpacity = list ? 1 : 0.5;
  const buttonTextColor = list ? "white" : "inherit";
  const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit";

  return (
    <OpenFormButton 
      onClick={onClick}
      opacity={buttonTextOpacity}
      color={buttonTextColor}
      backgroundColor={buttonTextBackground}
    >
      <Icon>add</Icon>
      <p style={{ flexShrink: 0 }}>{children}</p>
    </OpenFormButton>
  );
};

TrelloOpenForm.propTypes = {
  list: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

export default TrelloOpenForm;
