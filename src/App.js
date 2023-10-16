import { Fragment } from 'react';

// import wine data set 
import {dataSet} from "./utils/WineDataset"

function App() {
 // use set for  store unique class  Alchohal property  

	let uniqueClasses = [...new Set(dataSet().map((entry) => entry.Alcohol))];
  // uniqueClasses= 1,2,3 
 
    function calculateStatistics(){
      let statisticsByClass = {};
      uniqueClasses.forEach((className) => {
        let flavanoidsData = dataSet()
          .filter((entry) => entry.Alcohol === className)
          .map((entry) => parseFloat(entry.Flavanoids));
          // in above code line 15,16,17 check data in wine date set json and set  uniqueClasses and  return in array
          
          // and  pass to the below  mean ,mediann and mode function

          
        
          //  call function for mean ,median and mode
        let mean = calculateMean(flavanoidsData);
        let median = calculateMedian(flavanoidsData);
        let mode = calculateMode(flavanoidsData);
        statisticsByClass[className] = { mean, median, mode };
      });
      // return result mean , median or mode  in object 
      return statisticsByClass
    };
  
    function calculateMean(data){

      // find sum and divide by length and fixed result fixed value two decimal
      let sum = data.reduce((acc, value) => acc + value, 0);
     
      return (sum / data.length).toFixed(2);
    };
  
    function calculateMedian(data){
      // calculat and return median
      data.sort((a, b) => a - b);
      let middle = Math.floor(data.length / 2);
      if (data.length % 2 === 0) {
        return ((data[middle - 1] + data[middle]) / 2).toFixed(2);
      } else {
        return data[middle].toFixed(2);
      }
    };
  
    function calculateMode(data){
 // calculat and return mode
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
          <table style={{border:'1px solid black',marginLeft:'15cm',marginTop:'1cm',}}>
            <tr style={{border:'1px solid black'}}>
              <td style={{border:'1px solid black',padding:'5px 5px'}}>Measure</td>
           
                 <td style={{border:'1px solid black',padding:'5px 5px'}}> {"classn 1  "}</td>
                 <td style={{border:'1px solid black',padding:'5px 5px'}}> {"classn 2 "}</td>
                 <td style={{border:'1px solid black',padding:'5px 5px'}}> {"classn 3  "}</td>
           
            </tr>
            <tr>
              <td style={{border:'1px solid black',padding:'5px 5px'}}>Flavanoids Mean</td>
             
                  <td style={{border:'1px solid black',padding:'5px 5px'}}>{calculateStatistics()[1].mean}</td>
                  <td style={{border:'1px solid black',padding:'5px 5px'}}>{calculateStatistics()[2].mean}</td>
                  <td style={{border:'1px solid black',padding:'5px 5px'}}>{calculateStatistics()[3].mean}</td>
          
            </tr>
            <tr>
              <td style={{border:'1px solid black',padding:'5px 5px'}}>Flavanoids Median</td>
                  <td style={{border:'1px solid black',padding:'5px 5px'}}>{calculateStatistics()[1].median}</td>
                  <td style={{border:'1px solid black',padding:'5px 5px'}}>{calculateStatistics()[2].median}</td>
                  <td style={{border:'1px solid black',padding:'5px 5px'}}>{calculateStatistics()[3].median}</td>
            </tr>
            <tr>
              <td style={{border:'1px solid black',padding:'5px 5px'}}>Flavanoids Mode</td>
                <td style={{border:'1px solid black',padding:'5px 5px'}}>{calculateStatistics()[1].mode}</td>
                <td style={{border:'1px solid black',padding:'5px 5px'}}>{calculateStatistics()[2].mode}</td>
                <td style={{border:'1px solid black',padding:'5px 5px'}}>{calculateStatistics()[3].mode}</td>
              
            </tr>
          </table>
        </>
      )
    }



    // for calculate  gamma statistics :::
    function calculateGamma(){
      // set the gamma value according to  given formula and save in to  existing object 
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
      // save  in set by alcohal property for unique
      let uniqueClasses = [...new Set(updatedDataset.map((entry) => entry.Alcohol))];
      let statisticsByClass = {};

      uniqueClasses.forEach((className) => {
        let gammaData = updatedDataset
          .filter((entry) => entry.Alcohol === className)
          .map((entry) => entry.Gamma);
         // in above code find the date of gamma property and pass to function mean ,median, mode
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
      <table style={{border:'1px solid black', marginLeft:'15cm',marginTop:'1cm'}}>
          <tr >
            <td style={{border:'1px solid black',padding:'5px 5px'}}>Measure</td>
            <td style={{border:'1px solid black',padding:'5px 5px'}}> {"classn 1  "}</td>
                 <td style={{border:'1px solid black',padding:'5px 5px'}}> {"classn 2 "}</td>
                 <td style={{border:'1px solid black',padding:'5px 5px'}}> {"classn 3  "}</td>
          </tr>
          <tr>
            <td style={{border:'1px solid black',padding:'5px 5px'}}>Gamma Mean</td>
                <td style={{border:'1px solid black',padding:'5px 5px'}}>{calculateGammaStats()[1].mean}</td>
                <td style={{border:'1px solid black',padding:'5px 5px'}}>{calculateGammaStats()[2].mean}</td>
                <td style={{border:'1px solid black',padding:'5px 5px'}}>{calculateGammaStats()[3].mean}</td>
              
          </tr>
          <tr>
            <td style={{border:'1px solid black',padding:'5px 5px'}}>Gamma Median</td>
             <td style={{border:'1px solid black',padding:'5px 5px'}}>{calculateGammaStats()[1].median}</td>
             <td style={{border:'1px solid black',padding:'5px 5px'}}>{calculateGammaStats()[2].median}</td>
             <td style={{border:'1px solid black',padding:'5px 5px'}}>{calculateGammaStats()[3].median}</td>
          
          </tr>
          <tr>
            <td style={{border:'1px solid black',padding:'5px 5px'}}>Gamma Mode</td>
              <td style={{border:'1px solid black',padding:'5px 5px'}}>{calculateGammaStats()[1].mode}</td>
              <td style={{border:'1px solid black',padding:'5px 5px'}}>{calculateGammaStats()[2].mode}</td>
              <td style={{border:'1px solid black',padding:'5px 5px'}}>{calculateGammaStats()[3].mode}</td>
          </tr>
        </table>
    )
  }

	return (
		<Fragment>
			<div>
        <h1 style={{textAlign:'center',paddingTop:'1cm' }}>Data Visualization Task</h1>
				<button style={{marginLeft:'15cm'}} onClick={calculateStatistics}>Calculate Statistics</button>
		    </div> 

			{renderStatisticsTable()} <br/>
      <div>
				<button style={{marginLeft:'15cm'}}  onClick={calculateGammaStats}>Calculate Gamma Statistics</button>
			</div>
			{renderGammaStatsTable()}
		</Fragment>
	)
}
export default App;