/*
https://github.com/reactjs/react-modal
copyright - 2017 Ryan Florence  (not MIT, copyright only listed in license)
*/

import Modal from "react-modal";
import styled from "styled-components";
import React, { Component } from "react";
import state from "../../../store";
import downloadCSVdata from "./downloadCSVdata";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.0)"
  },
  content: {
    top: "90%",
    left: "0%",
    right: "auto",
    bottom: "auto",
    width: "100%",
    backgroundColor: "red",
    height: "200px"
  }
};

class DownloadCsvModal extends Component {
  // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    const isJsonLoaded = state.getState("showJsonFileLoadedMessage");

    if (isJsonLoaded) {
      downloadCSVdata(); //  OR open modal
    } else {
      console.log("error - no Json loaded");

      this.setState({
        modalIsOpen: true
      });
    }
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "black";
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  render() {
    return (
      <GridContainerDiv>
        <Button onClick={this.openModal}>Download JSON data as CSV</Button>
        <Modal
          ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)}>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
          </form>
        </Modal>
      </GridContainerDiv>
    );
  }
}
export default DownloadCsvModal;

const Button = styled.button`
  height: 50px;
  width: 320px;
  background-color: #d6dbe0;
  border-radius: 5px;
  font-size: 18px;
  font-family: Helvetica, sans-serif;
`;

const GridContainerDiv = styled.div`
  grid-column-start: 2;
  grid-row-start: 4;
`;
