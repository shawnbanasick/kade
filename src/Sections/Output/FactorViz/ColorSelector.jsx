import React from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";
import { view } from "react-easy-state";
import state from "../../../store";
import { clipboard } from "electron";
import { getColorHexRGB } from "electron-color-picker";

// const localStore = store({
//   displayColorPicker: false,
//   color: {
//     r: "232",
//     g: "229",
//     b: "229",
//     a: ".5"
//   }
// });

// const handleClick = () => {
//   console.log(JSON.stringify("handle click called"));

//   localStore.displayColorPicker = !localStore.displayColorPicker;
// };

// const handleClose = () => {
//   console.log(JSON.stringify("handle close called"));

//   localStore.displayColorPicker = false;
// };

const getColor = async () => {
  // color may be `#0099ff` or `` (pick cancelled)
  const color = await getColorHexRGB().catch(error => {
    console.warn(`[ERROR] getColor`, error);
    return "";
  });

  console.log(`getColor: ${color}`);
  // color && clipboard.writeText(color);
};

class ColorSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayColorPicker: false,
      color: {
        r: "232",
        g: "229",
        b: "229",
        a: ".5"
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick() {
    console.log(JSON.stringify("handle click called"));

    this.setState({
      displayColorPicker: !this.state.displayColorPicker
    });
    getColor();
  }

  handleClose() {
    console.log(JSON.stringify("handle close called"));

    this.setState({
      displayColorPicker: false
    });
  }

  handleChange(color) {
    console.log(JSON.stringify("handle change called"));
    const factorVizOptions = state.getState("factorVizOptions");
    factorVizOptions[this.props.id] = color.rgb;

    this.setState({
      color: color.rgb
    });

    state.setState({
      factorVizOptions
    });
  }

  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: "36px",
          height: "14px",
          borderRadius: "2px",
          background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${
            this.state.color.b
          }, ${this.state.color.a})`
        },
        swatch: {
          padding: "5px",
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          display: "inline-block",
          cursor: "pointer"
        },
        popover: {
          position: "absolute",
          zIndex: "2"
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px"
        }
      }
    });

    return (
      <div style={{ marginTop: 15 }}>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <SketchPicker
              color={this.state.color}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default view(ColorSelector);
