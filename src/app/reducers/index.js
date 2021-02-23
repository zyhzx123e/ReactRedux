import { combineReducers } from 'redux';


const initialState = {
  logged:false,
  apiKey:'ff9f895b2e884d6680530135202710',
  city:'',
  celcius:0,
  fahrenheit:0,
  cityHash:{'':'-1','Kuala Lumpur':'0','Singapore':'1'},
  cityMap:['Kuala Lumpur','Singapore'],
  httpURI:'http://api.weatherapi.com/v1/current.json?key='
}
//http://api.weatherapi.com/v1/current.json?key=ff9f895b2e884d6680530135202710&q=Singapore

const reducerLanding= (state=initialState,action) => { 
  let newState = {...state};
  switch(action.type){ 
    case "UPDATE": 
      if(action.payload.logged!==undefined)newState.logged=action.payload.logged;
      if(action.payload.apiKey)newState.apiKey=action.payload.apiKey;
      if(action.payload.city)newState.city=action.payload.city;
      if(action.payload.celcius!==undefined)newState.celcius=action.payload.celcius;
      if(action.payload.fahrenheit!==undefined)newState.fahrenheit=action.payload.fahrenheit;
      console.log('reducer=> UPDATE'); 
      console.log(action); 
      console.log(newState); 
      return newState;
    default:
      console.log('reducer=> default') 
      return newState; 
  } 
}


const rootReducer = combineReducers({
  reducerLanding:reducerLanding
});

export default reducerLanding;//rootReducer;
