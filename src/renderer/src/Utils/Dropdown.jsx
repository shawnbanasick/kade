import React from 'react';
// todo - delete unused component

const localStore = store({
  expanded: false,
  value: '',
  hasClicked: false,
});

class Dropdown extends React.Component {
  componentDidMount() {
    if (!localStore.hasClicked) {
      localStore.value = this.props.textValue;
    }
  }

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
    this.props.onChangeMessageUpTree(newSelection);
    localStore.hasClicked = true;
  }

  handleTriggerClick() {
    localStore.expanded = !localStore.expanded;
  }

  render() {
    const { width, options } = this.props;
    const isExpanded = localStore.expanded;

    let dropdown;
    if (isExpanded) {
      dropdown = (
        <div className="absolute w-full border-2 border-[#d6dbe0] rounded-b-md bg-white z-[999] h-[200px] overflow-auto">
          {options.map((item, index) => (
            <div
              role="listbox"
              key={item.toString() + index}
              onClick={(e) => this.handleItemClick(e)}
              className="px-2.5 py-2.5 font-sans transition-colors duration-100 z-[999] hover:bg-[#d6dbe0] hover:text-black hover:cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div
        className={`relative z-[99] overflow-visible mt-[7px] outline-none transition-shadow duration-100 font-sans text-lg ${isExpanded ? 'shadow-[0_10px_30px_rgba(0,0,0,0.2)]' : 'shadow-[0_4px_10px_rgba(0,0,0,0.2)]'}`}
        style={{ width }}
        tabIndex="0"
        onBlur={() => this.collapse()}
      >
        <div
          onClick={() => this.handleTriggerClick()}
          className={`border border-black cursor-pointer inline-block p-2.5 w-full bg-[#d6dbe0] h-[25px] shadow-[0_2px_2px_0_black] z-[99] overflow-visible transition-colors duration-100 text-black ${isExpanded ? 'rounded-t-md border-b-0' : 'rounded-md'}`}
        >
          {localStore.value}
        </div>
        {dropdown}
      </div>
    );
  }
}

export default Dropdown;
