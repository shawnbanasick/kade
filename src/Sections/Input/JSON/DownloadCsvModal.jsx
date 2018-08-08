/*
https://github.com/reactjs/react-modal
copyright - 2017 Ryan Florence  (not MIT, copyright only listed in license)
*/

// import store from "../../../store";
import React, { Component } from "react";
// import downloadCSVdata from "./downloadCSVdata";
import Modal from 'react-modal';
import styled from "styled-components";
import downloadCSVdata from './downloadCSVdata';

const customStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, .6)"
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: "400px"
    }
};

class DownloadCsvModal extends Component {

    // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
    // Modal.setAppElement('#JsonCardHolder');


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

        downloadCSVdata() //  OR open modal

        console.log("clicked")

    // this.setState({
    //     modalIsOpen: true
    // });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#83cafe';
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    render() {
        return (
            <div>
              <Button onClick={ this.openModal }>Download JSON data as CSV</Button>
              <Modal ariaHideApp={ false } isOpen={ this.state.modalIsOpen } onAfterOpen={ this.afterOpenModal } onRequestClose={ this.closeModal } style={ customStyles }
                contentLabel="Example Modal">
                <h2 ref={ subtitle => this.subtitle = subtitle }>Hello</h2>
                <button onClick={ this.closeModal }>close</button>
                <div>I am a modal</div>
                <form>
                  <input />
                </form>
              </Modal>
            </div>
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
    grid-column-start: 2;
    grid-row-start: 4;
`;