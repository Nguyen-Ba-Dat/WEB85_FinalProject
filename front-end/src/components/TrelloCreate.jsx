import React from "react";
import PropTypes from 'prop-types';
import { Icon } from "@mui/material";
import TrelloButton from "./TrelloButton";
import { connect } from "react-redux";
import { addList, addCard } from "../actions";
import styled from "styled-components";
import TrelloForm from "./TrelloForm";
import TrelloOpenForm from "./TrelloOpenForm";

class TrelloCreate extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    list: PropTypes.bool,
    listID: PropTypes.string
  };

  state = {
    formOpen: false,
    text: ""
  };

  openForm = () => {
    this.setState({
      formOpen: true
    });
  };

  closeForm = e => {
    this.setState({
      formOpen: false
    });
  };

  handleInputChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleAddList = () => {
    const { dispatch } = this.props;
    const { text } = this.state;

    if (text) {
      this.setState({
        text: ""
      });
      dispatch(addList(text));
    }

    return;
  };

  handleAddCard = () => {
    const { dispatch, listID } = this.props;
    const { text } = this.state;

    if (text) {
      this.setState({
        text: ""
      });
      dispatch(addCard(listID, text));
    }
  };

  renderOpenForm = () => {
    const { list } = this.props;
    const buttonText = list ? "Add another list" : "Add another card";
    
    return (
      <TrelloOpenForm list={list} onClick={this.openForm}>
        {buttonText}
      </TrelloOpenForm>
    );
  };

  render() {
    const { text } = this.state;
    const { list } = this.props;
    return this.state.formOpen ? (
      <TrelloForm
        text={text}
        onChange={this.handleInputChange}
        closeForm={this.closeForm}
      >
        <TrelloButton onClick={list ? this.handleAddList : this.handleAddCard}>
          {list ? "Add List" : "Add Card"}
        </TrelloButton>
      </TrelloForm>
    ) : (
      <TrelloOpenForm list={list} onClick={this.openForm}>
        {list ? "Add another list" : "Add another card"}
      </TrelloOpenForm>
    );
  }
}

export default connect()(TrelloCreate);
