import React from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from 'web3';
import security_token from './security_token'

class App extends React.Component {
  state = {
    name: '',
    symbol: '',
    totalSupply: '',
    value: ''
  }  
  constructor(props) {
    super(props);
    this.enable_ethereum();
  }
  async enable_ethereum() {
    await window.ethereum.enable();
  }
  async componentDidMount() {
    const name = await security_token.methods.name().call();
    this.setState({name: name});
    const symbol = await security_token.methods.symbol().call();
    this.setState({symbol: symbol});
    const totalSupply = await security_token.methods.totalSupply().call();
    this.setState({totalSupply: totalSupply});
    const balanceOf = await security_token.methods.balanceOf('0xFdc289a1ebB9a6A90d447179484199a39FFD75Be').call();
    this.setState({balanceOf: balanceOf});
  }
  onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    await security_token.methods.transfer().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    })
  }
  render() {
    const { web3 } = this.props;
    return (
      <div>
        <h2>Security Token Offering (STO) Platform</h2> 
        <p>This Ethereum dApp provides a self-service interface to create and issue security tokens.</p>
        <p>Aided by the latest developments in DeFi (decentralized finance), tokenizing an external asset results in digital, liquid contracts to preserve ownership stake.</p>
        <p>Issued tokens are compliant with the ERC20 standard and can be linked to any asset class.</p>
        <hr></hr>
        <h4>How it works:</h4>
        <p>Tokens are named and minted by the Asset Owner.</p>
        <p>Prospective Investors request tokens to be sent to their accounts and enter the amount of gas to cover the transaction fees.</p>
        <p>Tokens are transferred between accounts, aided by Owner-approved delegate accounts.</p>
        <hr></hr>
        <p>Name: {this.state.name}</p>
        <p>Symbol: {this.state.symbol}</p>
        <p>Total Supply: {this.state.totalSupply} tokens</p>
        <p>Owner's Balance: {this.state.balanceOf} tokens</p>
        <hr></hr>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Enter amount of ETH</label>
            <input
              value = {this.state.value}
              onChange = {event => this.setState({value: event.target.value})}
            />  
            <button>ETH amount</button>
          </div>
        </form>
        <hr></hr>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Enter number of tokens requested</label>
            <input
              value = {this.state.value}
              onChange = {event => this.setState({value: event.target.value})}
            />  
            <button>Request tokens</button>
          </div>
        </form>
      </div>
    );
  }
}
export default App;