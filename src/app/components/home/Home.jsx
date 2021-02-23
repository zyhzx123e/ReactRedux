
import React, { Component } from 'react';
import {connect} from 'react-redux';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Input } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'; 


class Home extends Component {
  
  state = {
    logged:false,
    celcius : '',
    fahrenheit : '',
  }
  constructor(props){
    super(props);
    this.onClicked.bind(this)
    this.state={ 
      celcius : '',
      fahrenheit : ''
    } 
    console.log(this.TAG+' cstr')
  }

  TAG='LandingPage'
  componentDidMount(){
    console.log(this.TAG+' componentDidMount');
    console.log(this.props)
    this.setState({
      celcius:this.props.celcius,
      fahrenheit:this.props.fahrenheit
    })
  }

  // componentWillReceiveProps(){
  //   console.log(this.TAG+' componentWillReceiveProps');
  //   console.log(this.props)
  // }
  getSnapshotBeforeUpdate(){
    console.log(this.TAG+' getSnapshotBeforeUpdate');
    console.log(this.props);
   
    return this.props;
  }

  componentDidUpdate(){
    console.log(this.TAG+' componentDidUpdate');
  }
  
  PLACEHOLDER_CELCIUS='Celcius';
  PLACEHOLDER_FAHRENHEIT='Fahrenheit';

  onClicked=()=>{
    console.log(this.state.celcius);
    this.updateCelcius(this.state.celcius)
  }

  updateCelcius(d){
    this.props.dispatch({
      type: 'UPDATE',
      payload: this.state.celcius
     });
  }



  onCelciusChange(e){
    console.log('onCelciusChange:'+e); 
    this.setState({
      celcius: e
    },()=>{
      this.props.dispatch({
        type: 'UPDATE',
        payload: {celcius:this.state.celcius}
       });
    });
  }

  onFahrenheitChange(e){
    console.log('onFahrenheitChange:'+e); 
    this.setState({
      fahrenheit: e
    },()=>{
      this.props.dispatch({
        type: 'UPDATE',
        payload: {fahrenheit:this.state.fahrenheit}
       });
    });
  
  }
  styles = {
    style_box : {
      display: 'flex',
      flexDirection: 'column',
      padding: '10px'
    },
    style_spacing_row:{
      marginTop: '15px'
    },
    style_title:{
      color: '#F85F6A', 
      fontWeight: '900',
      textAlign: 'left',
      marginTop: '10px'
    },
    style_text:{ 
      fontWeight: '900',
      fontSize: '1.1rem'
    } ,
    style_header:{ 
      fontWeight: '900',
      textAlign: 'left',
      color:'lightblue'
      
    } 
  };
 
  onClickedBack(e){
    this.props.dispatch({
      type: 'UPDATE',
      payload: {logged:false}
    });
  }
   
  render() {
    return (
    <div className="container landing" style={this.styles.style_box}>
      {(this.props.logged)?(<span className="headertxt" onClick={e=>this.onClickedBack(e)}>{'< Back'}</span>):(<span/>)}

      <span >{'Selected City : '+this.props.city}</span> 
      <span style={this.styles.style_title}>{'Celcius'}</span> 
    
      <Input onChange={e => this.onCelciusChange(e.target.value)}
      placeholder={this.PLACEHOLDER_CELCIUS} value={this.state.celcius}></Input>

      <span style={this.styles.style_title}>{'Fahrenheit'}</span> 
       <Input onChange={e => this.onFahrenheitChange(e.target.value)}
      placeholder={this.PLACEHOLDER_FAHRENHEIT} value={this.state.fahrenheit}></Input>

      {/* <Button  onClick={this.onClicked} style={this.styles.style_spacing_row}
      variant="contained" color="primary">Submit</Button> */}
    </div>
    )
  }
 
} 
const mapStateToProps = (state) => {
  return{
    logged:state.logged,
    city:state.city,
    celcius:state.celcius,
    fahrenheit:state.fahrenheit
  }
};
// const mapDispatchToProps = (dispatch) => {
//     return{
//       onClicked: () => 
//       {
//         console.log('dispatch UPDATE') 
//         dispatch({type:'UPDATE',payload: ''})
//       }
//     }
// };
export default  connect(mapStateToProps)(Home);
//export default connect(mapStateToProps,mapDispatchToProps)(Landing);
