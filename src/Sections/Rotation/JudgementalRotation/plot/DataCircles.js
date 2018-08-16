import React from "react";
import store from "../../../store";

// todo - fix mouseover so that it works over circle numbers as well

const styles = {
    // fill: "white",
    stroke: "black",
    strokeWidth: 0.5,
    zindex: 99
};

const getFillColor = data => {
    if (data.factor1Sig === true) {
        return "aquamarine"; //"#ffe4b2";
    }
    if (data.factor2Sig === true) {
        return "#ffe4b2";
    }
    return "#d3d3d3";
};

const showPopUp = function(info) {
    store.setState({
        participantDataObject: info
    });
};

const closePopUp = function() {
    store.setState({
        participantDataObject: false
    });
};

const renderCircles = props => {
    return (coords, index) => {
        const circleProps = {
            cx: props.xScale(props.data[index].factor2),
            cy: props.yScale(props.data[index].factor1),
            r: 9,
            key: props.data[index].num,
            fill: getFillColor(props.data[index]),
            text: props.data[index].num
        // on:("mouseover", showPopUp())
        };
        return (
            <circle onMouseOver={ () => showPopUp(props.data[index]) } onMouseOut={ () => closePopUp() } {...styles} {...circleProps} />
            );
    };
};

export default props => {
    return <g>
             { props.data.map(renderCircles(props)) }
           </g>;
};
