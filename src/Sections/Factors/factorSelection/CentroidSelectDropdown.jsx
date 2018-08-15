import React from "react";
import state from "../../../store";
import Dropdown from '../../../Utils/Dropdown';


const options = [1,2,3,4,5,6,7,8];

class DropdownMultipleSelection extends React.Component {
    handleMessage(jsonIdSelection) {
        state.setState({
            numCentroidFactors: jsonIdSelection
        })
        console.log(jsonIdSelection);
        // displayJsonData(jsonIdSelection);
      }
 render() { 
    return (
    <div>
      <span style={ { marginRight: 10 } }>Extract</span>
      {/* <Button.Group size={ "big" } color="black" basic> */}
        <Dropdown 
            id="centroidSelectDropdown"  
            onChangeMessageUpTree={this.handleMessage} 
            textValue={"7 \u25BC"} 
            options={ options } 
            width='38px'
            />
      {/* </Button.Group> */}
    </div>
);

}
}
export default DropdownMultipleSelection;

