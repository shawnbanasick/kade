import React, { Component } from 'react';
import { Form, Radio } from 'semantic-ui-react';
import store from '../../store';
import './CustomFileNameLocation.css';

const styles = {
    display: "flex", 
    marginTop: 15, 
    fontSize: 20
}


export default class CustomFileNameLocation extends Component {
  state = {}
  handleChange = (e, { value }) => {
      this.setState({ value })
      store.setState({customFileNameLocation: value});
  }

  render() {
    return (
      <Form style={styles}>
        <Form.Field>
          Custom name position: 
        </Form.Field>
        <Form.Field>
          <Radio
            style={{marginLeft:16, fontSize: 20}}
            label='Prepend'
            name='radioGroup'
            value='prepend'
            checked={this.state.value === 'prepend'}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            style={{marginLeft:16, fontSize: 20}}          
            label='Append'
            name='radioGroup'
            value='append'
            checked={this.state.value === 'append'}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            style={{marginLeft:16, fontSize: 20}}
            label='Replace'
            name='radioGroup'
            value='replace'
            checked={this.state.value === 'replace'}
            onChange={this.handleChange}
          />
        </Form.Field>

      </Form>
    )
  }
}