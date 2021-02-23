
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
import axios from 'axios';
import Modal from './../common/Modal'
import Home from './../home/Home'


class Landing extends Component {
  
  state = {
    logged:false,
    apiKey : '',
    city : '',
    modal:false
  }
  constructor(props){
    super(props);
    this.onClicked.bind(this)
    this.state={ 
      logged: false,
      apiKey : '',
      city : '',
      modal: false
    } 
    console.log(this.TAG+' cstr')
  }

  TAG='LandingPage'
  componentDidMount(){
    console.log(this.TAG+' componentDidMount');
    console.log(this.props)
    this.setState({
      apiKey:this.props.apiKey,
      city:this.props.city,
      logged:false
    });
    this.props.dispatch({
      type: 'UPDATE',
      payload: {logged:false}
    });
    console.log('this.props.cityHash[this.state.city]:'+this.props.cityHash[this.state.city])
 
  }

  // componentWillReceiveProps(){
  //   console.log(this.TAG+' componentWillReceiveProps');
  //   console.log(this.props)
  // }
  getSnapshotBeforeUpdate(){
    console.log(this.TAG+' getSnapshotBeforeUpdate');
    console.log(this.props);
    if(this.props.logged && this.props.location.action!='POP'){
      this.props.dispatch({
        type: 'UPDATE',
        payload: {logged:false}
      });
    }
    
    return this.props;
  }

  componentDidUpdate(){
    console.log(this.TAG+' componentDidUpdate');
  }
  
  PLACEHOLDER_API_KEY='Api Key';
  PLACEHOLDER_CITY='City';

  
  httpCall(){ 
    let uri=this.props.httpURI+this.state.apiKey+'&q='+encodeURIComponent(this.state.city);
    console.log('httpCall get uri:'+uri)
    axios.get(uri)
    .then((res) =>{
      //{"location":{"name":"Singapore","region":"","country":"Singapore","lat":1.29,"lon":103.86,"tz_id":"Asia/Singapore","localtime_epoch":1613661766,"localtime":"2021-02-18 23:22"},"current":{"last_updated_epoch":1613661309,"last_updated":"2021-02-18 23:15","temp_c":27.0,"temp_f":80.6,"is_day":0,"condition":{"text":"Partly cloudy","icon":"//cdn.weatherapi.com/weather/64x64/night/116.png","code":1003},"wind_mph":13.6,"wind_kph":22.0,"wind_degree":40,"wind_dir":"NE","pressure_mb":1014.0,"pressure_in":30.4,"precip_mm":0.0,"precip_in":0.0,"humidity":70,"cloud":75,"feelslike_c":29.0,"feelslike_f":84.2,"vis_km":10.0,"vis_miles":6.0,"uv":1.0,"gust_mph":25.3,"gust_kph":40.7}}
      // handle success
      console.log('http call succeeded:');
      console.log(res);
      let obj=(res.data);
      let temp_c=obj.current.temp_c;
      let temp_f=obj.current.temp_f;
      console.log('http call succeeded temp_c:'+temp_c);
      console.log('http call succeeded temp_f:'+temp_f);
      this.props.dispatch({
        type: 'UPDATE',
        payload: {celcius:temp_c,fahrenheit:temp_f,logged:true}
      });

    })
    .catch((err) => {
      // handle error
      console.log('http call err:');
      let msg='Please select a city!';
      let err_msg=JSON.stringify(err).substr(0,255)
      this.setState({modal:true,modalMessage:err_msg+'...'})
      console.log(err);
    })
    .then(_=>{
      console.log('http call end');
    });

  }

  onClicked=()=>{
    console.log(this.state.apiKey);
    this.updateApiKey(this.state.apiKey);
    if(!this.state.apiKey || this.state.apiKey.trim()==''){
      //alert('API Key cannot be empty!')
      let msg='API Key cannot be empty!';
      this.setState({modal:true,modalMessage:msg})
      return;
    }
    if(!this.state.city || this.state.city.trim()==''){
      //alert('Please select a city!')
      let msg='Please select a city!';
      this.setState({modal:true,modalMessage:msg})
      return;
    }

    this.httpCall();
  }

  updateApiKey(d){
    this.props.dispatch({
      type: 'UPDATE',
      payload: {apiKey:this.state.apiKey}
     });
  }



  onApiKeyChange(e){
    console.log('onApiKeyChange:'+e); 
    this.setState({
      apiKey: e
    },()=>{
      this.props.dispatch({
        type: 'UPDATE',
        payload: {apiKey:this.state.apiKey}
       });
    });
  }

  onCityChange(e){
    console.log('onCityChange:'+e); 
    this.setState({
      city: e
    },()=>{
      this.props.dispatch({
        type: 'UPDATE',
        payload: {city:this.state.city}
       });
    }); 
  }

  handleSelectChange(e){
    console.log('handleSelectChange:'+e);
  
    let city_=this.props.cityMap[e];
    this.setState({
      city: city_
    },()=>{
      this.props.dispatch({
        type: 'UPDATE',
        payload: {city:this.state.city}
       });
    }); 
    console.log('handleSelectChange: city '+city_);
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
    }
  
  };
 
  onClickedCloseModal(e){
    this.updateModalState();
  }
  updateModalState(){
    this.setState({modal:false,modalMessage:''})
  }
  
   
  render() {
    return (
    <div className="container landing" style={this.styles.style_box}>
      {
      (!this.props.logged)?    
      (
      <div style={this.styles.style_box}>
        <span style={this.styles.style_title}>{'Your API Key'}</span> 
      
        <Input onChange={e => this.onApiKeyChange(e.target.value)}
        placeholder={this.PLACEHOLDER_API_KEY} value={this.state.apiKey}></Input>

        <span style={this.styles.style_title}>{'City Name'}</span> 
        {/* <Input onChange={e => this.onCityChange(e.target.value)}
        placeholder={this.PLACEHOLDER_CITY} value={this.state.city}></Input> */}

        <FormControl variant="filled" >
         
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={this.props.cityHash[this.state.city]}
            onChange={e => this.handleSelectChange(e.target.value)} 
          >
            <MenuItem value="-1">{'Select City'}</MenuItem>
            {this.props.cityMap.map((x,y) => <MenuItem key={y} value={y}>{x}</MenuItem>)}
             
          </Select>
        </FormControl>
        <Button  onClick={this.onClicked} style={this.styles.style_spacing_row}
        variant="contained" color="primary">Submit</Button>
      
        {(this.state.modal)?
        (<Modal show={this.state.modal} handleClose={e => this.onClickedCloseModal(e)}>
          <h4>{this.state.modalMessage}</h4> 
          <div className="form-group">
          <Button  onClick={e=>this.onClickedCloseModal(e)} style={this.styles.style_spacing_row}
        variant="contained" color="primary">Ok</Button>
          </div>
        </Modal>):(<span/>)}
      </div>
      )
      : (<Home/>) 
    }
      
    </div>
    )
  }
 
} 
const mapStateToProps = (state) => {
  return{
    logged:state.logged,
    apiKey:state.apiKey,
    city:state.city,
    cityMap:state.cityMap,
    cityHash:state.cityHash,
    httpURI:state.httpURI
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
export default  connect(mapStateToProps)(Landing);
//export default connect(mapStateToProps,mapDispatchToProps)(Landing);
