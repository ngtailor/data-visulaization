import { Fragment } from 'react';

// import wine data set 
import {dataSet} from "./utils/WineDataset"

function App() {
 // use set for unique class 
	let uniqueClasses = [...new Set(dataSet().map((entry) => entry.Class))];
 
    function calculateStatistics(){
      let statisticsByClass = {};
      uniqueClasses.forEach((className) => {
        let flavanoidsData = dataSet()
          .filter((entry) => entry.Class === className)
          .map((entry) => parseFloat(entry.Flavanoids));

          //  call function for mean ,median and mode
        let mean = calculateMean(flavanoidsData);
        let median = calculateMedian(flavanoidsData);
        let mode = calculateMode(flavanoidsData);
        statisticsByClass[className] = { mean, median, mode };
      });
      return statisticsByClass
    };
  
    function calculateMean(data){
      let sum = data.reduce((acc, value) => acc + value, 0);
     
      return (sum / data.length).toFixed(2);
    };
  
    function calculateMedian(data){
      data.sort((a, b) => a - b);
      let middle = Math.floor(data.length / 2);
      if (data.length % 2 === 0) {
        return ((data[middle - 1] + data[middle]) / 2).toFixed(2);
      } else {
        return data[middle].toFixed(2);
      }
    };
  
    function calculateMode(data){
      const counts = {};
      let mode = null;
      let maxCount = 0;
  
      data.forEach((value) => {
        counts[value] = (counts[value] || 0) + 1;
        if (counts[value] > maxCount) {
          maxCount = counts[value];
          mode = value;
        }
      });
      return mode !== null ? mode.toFixed(2) : "No mode";
    };
  
    function renderStatisticsTable(){
      return (
        <>
          <table style={{border:'1px solid black'}}>
            <tr style={{border:'1px solid black'}}>
              <td style={{border:'1px solid black',padding:'5px 5px'}}>Measure</td>
              {dataSet().map((item,i)=>{
                return  <td style={{border:'1px solid black',padding:'5px 5px'}}> {"class "+item.Alcohol}</td>
              })}
            </tr>
            <tr>
              <td style={{border:'1px solid black',padding:'5px 5px'}}>Flavanoids Mean</td>
              {dataSet().map((item,i)=>{
                return  <td style={{border:'1px solid black',padding:'5px 5px'}}>{calculateStatistics().undefined.mean}</td>
              })}
            </tr>
            <tr>
              <td style={{border:'1px solid black',padding:'5px 5px'}}>Flavanoids Median</td>
              {dataSet().map((item,i)=>{
                return  <td style={{border:'1px solid black',padding:'5px 5px'}}>{calculateStatistics().undefined.median}</td>
              })}
            </tr>
            <tr>
              <td style={{border:'1px solid black',padding:'5px 5px'}}>Flavanoids Mode</td>
              {dataSet().map((item,i)=>{
                return  <td style={{border:'1px solid black',padding:'5px 5px'}}>{calculateStatistics().undefined.mode}</td>
              })}
            </tr>
          </table>
        </>
      )
    }



    // for calculate  gamma statistics :::
    function calculateGamma(){
        let updatedDataset = dataSet().map((entry) => {
        let ash = parseFloat(entry.Ash);
        let hue = parseFloat(entry.Hue);
        let magnesium = parseFloat(entry.Magnesium);
        let gamma = (ash * hue) / magnesium;
        return { ...entry, Gamma: gamma };
      });
  
      return updatedDataset;
    }
    function calculateGammaStats(){
      let updatedDataset = calculateGamma();
      let uniqueClasses = [...new Set(updatedDataset.map((entry) => entry.Class))];
      let statisticsByClass = {};

      uniqueClasses.forEach((className) => {
        let gammaData = updatedDataset
          .filter((entry) => entry.Class === className)
          .map((entry) => entry.Gamma);
          // claculate mean,median ,mode
        let mean = calculateMean(gammaData);
        let median = calculateMedian(gammaData);
        let mode = calculateMode(gammaData);
        statisticsByClass[className] = { mean, median, mode };
      });
     return statisticsByClass;
    }

  function renderGammaStatsTable(){
    return (
      <table style={{border:'1px solid black'}}>
          <tr >
            <td style={{border:'1px solid black',padding:'5px 5px'}}>Measure</td>
            {dataSet().map((item,i)=>{
              return  <td style={{border:'1px solid black',padding:'5px 5px'}}>{item.Alcohol}</td>
            })}
          </tr>
          <tr>
            <td style={{border:'1px solid black',padding:'5px 5px'}}>Gamma Mean</td>
            {dataSet().map((item,i)=>{
              return  <td style={{border:'1px solid black',padding:'5px 5px'}}>{calculateGammaStats().undefined.mean}</td>
            })}
          </tr>
          <tr>
            <td style={{border:'1px solid black',padding:'5px 5px'}}>Gamma Median</td>
            {dataSet().map((item,i)=>{
              return  <td style={{border:'1px solid black',padding:'5px 5px'}}>{calculateGammaStats().undefined.median}</td>
            })}
          </tr>
          <tr>
            <td style={{border:'1px solid black',padding:'5px 5px'}}>Gamma Mode</td>
            {dataSet().map((item,i)=>{
              return  <td style={{border:'1px solid black',padding:'5px 5px'}}>{calculateGammaStats().undefined.mode}</td>
            })}
          </tr>
        </table>
    )
  }

	return (
		<Fragment>
			<div>
        <h1 style={{textAlign:'center'}}>Data Visualization Task</h1>
				<button onClick={calculateStatistics}>Calculate Statistics</button>
		    </div> 

			{renderStatisticsTable()} <br/>
      <div>
				<button onClick={calculateGammaStats}>Calculate Gamma Statistics</button>
			</div>
			{renderGammaStatsTable()}
		</Fragment>
	)
}
export default App;