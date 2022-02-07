function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p> The water would boil.</p>;
    }
    return <p> The water would not boil</p>;
}
//Component called calculator that renders an <input> that lets you enter
// the temperature, and keeps its value in this.state.temperature
class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFarenheitChange = this.handleFarenheitChange.bind(this);
        this.state = {temperature: '', scale: 'c'};
    }
    
    handleCelsiusChange(temperature) {
        this.setState({scale: 'c', temperature});
    }

    handleFareheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale ==='f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
        return (
            <div>
            <TemperatureInput 
            scale="c"
            temperature={celsius}
            onTemperatureChange={this.handleCelsiusChange} 
            />
            
            <TemperatureInput 
            scale="f"
            temperature={fahrenheit}
            onTemperatureChange={this.handleFahrenheitChange}
            />
            <BoilingVerdict
            celsius={parseFloat(celsius)} />
            </div>
        );
    }
}
//A TemperatureInput component from calculator that provides
// both celsius and farenheit as props in sync with one another.

const scaleNames = {
    c:'Celsius',
    f: 'Farenheit'
};

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return(
            <fieldset>
            <legend>Enter temperature in {scaleNames[scale]}:</legend>
            <input value={temperature}
             onChange={this.handleChange} 
             />
            </fieldset>
        );
    }
}