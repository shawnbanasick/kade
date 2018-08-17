import store from '../../store';
import React, { Component } from 'react';
import { Checkbox } from 'semantic-ui-react';
import '../LoadingsTable/MajorityCommonVarianceCheckbox.css';

export default class MajorityCommonVarianceCheckbox extends Component {
    state = {
        checked: true
    }
    toggle = () => {
        let requireMajorityCommonVariance = store.getState('requireMajorityCommonVariance');
        requireMajorityCommonVariance = !requireMajorityCommonVariance;
        store.setState({
            requireMajorityCommonVariance: requireMajorityCommonVariance
        });

        this.setState({
            checked: !this.state.checked
        });
    }

    render() {
        return (
            <div className="commonVarianceDiv">
              <Checkbox label='Require Majority of Common Variance' onChange={ this.toggle } checked={ this.state.checked } />
            </div>
        )
    }
}

