import React, { Component } from 'react';
import React, { Component } from 'react';
import {render} from 'react-dom';
import './style.css';
import PropTypes from 'prop-types';
import {StaticDataSource} from './StaticDataSource'
/**
 * <App>
 *    <header/>
 *    <search> 
 *    <product/>
 *    
 * <compan>
 *       
 *         
 * </App>
 */

const Header = ({header}) => <h1> {header} </h1>;
PropTypes.propTypes = {
  header: PropTypes.string
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: 'ffood basket',
      description: 'some description',
      products: []
    };
  }
  componentDidMount() {
    const data = (new StaticDataSource).getProducts();
    this.setState({
      products: data
    });
    console.log(data);
  }
  render() {
    return (
      <>
        <Header header={this.state.header}></Header>
        <p> {this.state.description} </p>
        <ul> {
          this.state.products.map((product) => <li key={product.productId}> { product.productName }</li>)
        } </ul>
      </>
    )
  }
}

render(<App/>, document.getElementById('root'));

