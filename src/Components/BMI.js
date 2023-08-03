import React, {useState, useEffect} from 'react';
import './BMI.css';

const BMI = () =>{
  //states
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [bmi, setBmi] = useState('');
  const [msg, setMsg] = useState('');
  const [system, setSystem] = useState('metric');
  const [weightText, setWeightText] = useState('Height (cm): ');
  const [heightText, setHeightText] = useState('Weight (kg): ');

  // reset page
  const reload = () => {
    window.location.reload();
  }

  // submit logic
  const calcBMI = (e) => {
    // prevent submitting
    e.preventDefault();

    // validate input
    if(weight <= 0 || height <= 0 || !weight || !height) {
      alert("Please enter valid height and weight");
    }
    else {
      // calculate BMI
      var bmiFormula = (weight/(height*height));
      var bmi = bmiFormula * (system === 'metric' ? 10000 : 703);
      setBmi(bmi.toFixed(1));

      // message logic
      if(bmi < 18.5){
        setMsg('You are Underweight');
      } else if(bmi >= 18.5 && bmi <= 24.9){
        setMsg('You are at Normal weight');
      } else if(bmi >= 25 && bmi <= 29.9){
        setMsg('You are Overweight');
      } else {
        setMsg('You are Obease');
      }
    }
  }

  // update labels based on system used
  useEffect(() => {
    if(system === 'metric') {
      setHeightText('Height (cm): ');
      setWeightText('Weight (kg): ');
    }
    else{
      setHeightText('Height (in): ');
      setWeightText('Weight (lbs): ');
    }
  }, [system]);

  return(
    <div className="app">
      <div className="container">
        <h1 className="title"> BMI Calculator </h1>

        {/* form */}
        <form onSubmit={calcBMI}>
          <div className='bmi-radio-btn'>
            <br />
            <div className="radio-buttons">
              <input
                type="radio"
                className="bmi-radio-btn btn"
                value='metric'
                checked={system === 'metric'}
                onChange={e=>setSystem(e.target.value)}
              /> Metric
              <input
                type="radio"
                className="bmi-radio-btn btn"
                value='imperial'
                checked={system === 'imperial'}
                onChange={e=>setSystem(e.target.value)}
              /> Imperial
            </div>
          </div>

          <div>
            <label className="labels"> {weightText} </label> <br />
            <input type="number" className="bmi-input" placeholder="" value={weight || ''} onChange={(e)=>setWeight(e.target.value)}/>
          </div>

          <div>
            <label className="labels"> {heightText} </label> <br />
            <input type="number" className="bmi-input" placeholder="" value={height || ''} onChange={(e)=>setHeight(e.target.value)}/>
          </div>

          <button type="submit" className="btn"> Calculate </button>
          <button type="reset" className="btn btn-reset" onClick={reload}> Reset </button>
        </form>

        {/* result */}
        <div className="result">
          <h3> Your BMI is: {bmi} </h3>
          <p> {msg} </p>
        </div>
      </div>
    </div>
  )
}

export default BMI;
