import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchWeather, fetchSuggestion} from '../../actions/searches.js';
import OneDayWeather from '../../components/weather/OneDayWeather.js';



class WeatherSearch extends Component {
    constructor(props){
        super(props);
        this.state ={
            zip: '',
        }
    }

    handleOnChange = (event) => {
        this.setState({zip: event.target.value})
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.fetchWeather(this.state.zip)
        .then(data => this.setState({zip: ''}))
    }

    handleSuggestionClick = (zip) => {
        this.props.fetchSuggestion(zip)
    }

    render(){
        const isEnabled = this.state.zip.match(/\b\d{5}\b/)
       
        return(
            <>
                <h2>Search for Current Local Weather:</h2>

                <form className="clearfix" onSubmit={this.onSubmitHandler}>
                    <label><strong> Enter Zipcode: </strong></label>
                    <input type="text" onChange={this.handleOnChange} value={this.state.zip}/>
                    <p><strong>(Only 5 digit US Zipcodes accepted.   )</strong></p>
                    <input className="first-big-button" type="submit" disabled={!isEnabled}/>
                </form>
                
                <OneDayWeather 
                    loading={this.props.loading} 
                    weather={this.props.weather}
                    handleClick={this.handleSuggestionClick}
                    suggestion={this.props.suggestion}
                    errMessage={this.props.errMessage}
                    />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {weather: state.weather,
            loading: state.loading,
            suggestion: state.suggestion,
            errMessage: state.errMessages}
  }

export default connect(mapStateToProps,{fetchWeather, fetchSuggestion})(WeatherSearch)