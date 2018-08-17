import React from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";
import store from "../../store";

class ColorSelector extends React.Component {
    state = {
        displayColorPicker: false,
        color: {
            r: "232",
            g: "229",
            b: "229",
            a: ".5"
        }
    };

    handleClick = () => {
        this.setState({
            displayColorPicker: !this.state.displayColorPicker
        });
    };

    handleClose = () => {
        this.setState({
            displayColorPicker: false
        });
    };

    handleChange = color => {
        let tempObj = {};
        tempObj[this.props.id] = color.rgb;
        store.setState(tempObj);
        this.setState({
            color: color.rgb
        });
        store.setState({
            consensusIndicator: color.rgb
        });
    };

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
            <div style={ { marginTop: 15 } }>
              <div style={ styles.swatch } onClick={ this.handleClick }>
                <div style={ styles.color } />
              </div>
              { this.state.displayColorPicker ? (
                <div style={ styles.popover }>
                  <div style={ styles.cover } onClick={ this.handleClose } />
                  <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
                </div>
                ) : null }
            </div>
            );
    }
}

export default ColorSelector;
