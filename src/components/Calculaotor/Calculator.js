import React, { useState } from "react";
import CalculatorCss from "./Calculator.module.css"; // Import CSS Module

const Calculator = () => {
  const [vvalue, setValue] = useState('');

  const handleDelete = () => {
    setValue((prevValue) => prevValue.slice(0, -1));
  };

  const handleEvaluate = () => {
    try {
      setValue(eval(vvalue).toString());
    } catch (error) {
      setValue("Error");
    }
  };

  return (
    <div className={CalculatorCss.container}>
      <div className={CalculatorCss.calculator}>
        <form>
          <div>
            <input type="text" value={vvalue} readOnly className={CalculatorCss.display} />
          </div>
          <div>
            <input type="button" value="AC" onClick={() => setValue('')} className={CalculatorCss.button} />
            <input type="button" value="DE" onClick={handleDelete} className={CalculatorCss.button} />
            <input type="button" value="." onClick={e => setValue(vvalue + e.target.value)} className={CalculatorCss.button} />
            <input type="button" value="/" onClick={e => setValue(vvalue + e.target.value)} className={CalculatorCss.button} />
          </div>
          <div>
            <input type="button" value="7" onClick={e => setValue(vvalue + e.target.value)} className={CalculatorCss.button} />
            <input type="button" value="8" onClick={e => setValue(vvalue + e.target.value)} className={CalculatorCss.button} />
            <input type="button" value="9" onClick={e => setValue(vvalue + e.target.value)} className={CalculatorCss.button} />
            <input type="button" value="*" onClick={e => setValue(vvalue + e.target.value)} className={CalculatorCss.button} />
          </div>
          <div>
            <input type="button" value="4" onClick={e => setValue(vvalue + e.target.value)} className={CalculatorCss.button} />
            <input type="button" value="5" onClick={e => setValue(vvalue + e.target.value)} className={CalculatorCss.button} />
            <input type="button" value="6" onClick={e => setValue(vvalue + e.target.value)} className={CalculatorCss.button} />
            <input type="button" value="+" onClick={e => setValue(vvalue + e.target.value)} className={CalculatorCss.button} />
          </div>
          <div>
            <input type="button" value="1" onClick={e => setValue(vvalue + e.target.value)} className={CalculatorCss.button} />
            <input type="button" value="2" onClick={e => setValue(vvalue + e.target.value)} className={CalculatorCss.button} />
            <input type="button" value="3" onClick={e => setValue(vvalue + e.target.value)} className={CalculatorCss.button} />
            <input type="button" value="-" onClick={e => setValue(vvalue + e.target.value)} className={CalculatorCss.button} />
          </div>
          <div>
            <input type="button" value="00" onClick={e => setValue(vvalue + e.target.value)} className={CalculatorCss.button} />
            <input type="button" value="0" onClick={e => setValue(vvalue + e.target.value)} className={CalculatorCss.button} />
            <input type="button" value="=" onClick={handleEvaluate} className={`${CalculatorCss.button} ${CalculatorCss.equal}`} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Calculator;
