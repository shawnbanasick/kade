import React from "react";
import { view, store } from "react-easy-state";
import styled from "styled-components";

const localStore = store({
  expanded: false,
  value: "Select Participant Id..."
});

class Dropdown extends React.Component {

  expand() {
    localStore.expanded = true;
  }

  collapse() {
    localStore.expanded = false;
  }

  handleItemClick(e) {
    const newSelection = e.target.innerText;
    localStore.expanded = false;
    localStore.value = newSelection;
    this.props.onChangeMessageUpTree(newSelection)
  }

  handleTriggerClick() {
    localStore.expanded = !this.state.expanded;
  }

  render() {
    let dropdown;
    if (localStore.expanded) {
      dropdown = (
        <div className="content">
          { this.props.options.map((item, index) => (
              <div role="listbox" key={ item.toString() + index } onClick={ e => {
                                                                            this.handleItemClick(e);
                                                                          } } className="item">
                { item }
              </div>
            )) }
        </div>
      );
    }

    return (
      <DropdownDiv className={ ` ${localStore.expanded ? "active" : ""}` } tabIndex="0" onBlur={ () => {
                                                                                             this.collapse();
                                                                                           } }>
        <div className="trigger" onClick={ () => {
                                             this.handleTriggerClick();
                                           } }>
          { localStore.value }
        </div>
        { dropdown }
      </DropdownDiv>
      );
  }
}

export default view(Dropdown);

// <Dropdown options={['Strawberry Cream', 'Chocolate Flakes', 'Marshmallow Sprinkles']} />
// blue color => #d6dbe0

const DropdownDiv = styled.div`
  box-shadow: 0 4px 10px rgba(#7c4dff, 0.2);
  margin-top: 7px;
  outline: none;
  position: relative;
  transition: box-shadow 0.1s linear;
  width: 200px;
  font-family: Helvetica, sans-serif;
  font-size: 18px;

  &.active {
    box-shadow: 0 10px 30px rgba(#7c4dff, 0.2);
  }

  &:hover > .trigger,
  &.active > .trigger {
    background: #d6dbe0;
    color: black;
  }

  &.active > .trigger {
    background: #d6dbe0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    color: black;
  }

  .trigger {
    border: 1px solid black;
    border-radius: 5px;
    cursor: pointer;
    display: inline-block;
    padding: 10px;
    width: 100%;
    background: #d6dbe0;
    height: 25px;
  }

  .content {
    background: ##d6dbe0;
    border: 2px solid #d6dbe0;
    border-radius: 0 0 5px 5px;
    padding: 10px;
    position: absolute;
    width: 100%;
    overflow: auto;
    height: 200px;
    background-color: white;
  }

  .item {
    padding: 10px;
    transition: background 0.1s linear;
    font-family: Helvetica, sans-serif;

    &:hover {
      background: #d6dbe0;
      color: black;
      cursor: pointer;
    }
  }
`;
