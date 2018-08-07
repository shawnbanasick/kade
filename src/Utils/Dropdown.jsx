import React from "react";
import { view } from "react-easy-state";
import styled from "styled-components";

// let localStore =

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      value: "Select Participant Id..."
    };
  }

  expand() {
    this.setState({ expanded: true });
  }

  collapse() {
    this.setState({ expanded: false });
  }

  handleItemClick(e) {
    this.setState({
      expanded: false,
      value: e.target.innerText
    });
    console.log(e.target.innerText);
  }

  handleTriggerClick() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    let dropdown;
    if (this.state.expanded) {
      dropdown = (
        <div className="content">
          {this.props.options.map(item => (
            <div
              role="listbox"
              key={item.toString()}
              onClick={e => {
                this.handleItemClick(e);
              }}
              className="item"
            >
              {item}
            </div>
          ))}
        </div>
      );
    }

    return (
      <DropdownDiv
        className={` ${this.state.expanded ? "active" : ""}`}
        tabIndex="0"
        onBlur={() => {
          this.collapse();
        }}
      >
        <div
          className="trigger"
          onClick={() => {
            this.handleTriggerClick();
          }}
        >
          {this.state.value}
        </div>
        {dropdown}
      </DropdownDiv>
    );
  }
}

export default view(Dropdown);

// <Dropdown options={['Strawberry Cream', 'Chocolate Flakes', 'Marshmallow Sprinkles']} />
// blue color => #2196f3

const DropdownDiv = styled.div`
  box-shadow: 0 4px 10px rgba(#7c4dff, 0.2);
  margin: 50px auto;
  outline: none;
  position: relative;
  transition: box-shadow 0.1s linear;
  width: 200px;
  font-family: Helvetica, sans-serif;

  &.active {
    box-shadow: 0 10px 30px rgba(#7c4dff, 0.2);
  }

  &:hover > .trigger,
  &.active > .trigger {
    background: #2196f3;
    color: #fff;
  }

  &.active > .trigger {
    background: #2196f3;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    color: #fff;
  }

  .trigger {
    border: 2px solid #2196f3;
    border-radius: 5px;
    cursor: pointer;
    display: inline-block;
    padding: 10px;
    width: 100%;
  }

  .content {
    background: #fff;
    border: 2px solid #2196f3;
    border-radius: 0 0 5px 5px;
    padding: 10px;
    position: absolute;
    width: 100%;
  }

  .item {
    padding: 10px;
    transition: background 0.1s linear;
    font-family: Helvetica, sans-serif;

    &:hover {
      background: #2196f3;
      color: #fff;
      cursor: pointer;
    }
  }
`;
