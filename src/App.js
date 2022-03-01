import './App.css';
import csvData from "./wincdata.csv";
import { useEffect, useState } from 'react';
import { csv } from 'd3';
import { DisplayChart } from './charts/DisplayChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faChartColumn, faTable } from '@fortawesome/free-solid-svg-icons';

const App = () => {

  const [data, setData] = useState();
  const [nameList, setNameList] = useState([]);
  const [currentData, setCurrentData] = useState();
  const [graphType, setGraphType] = useState("bar");
  const [choice, setChoice] = useState("both")

  useEffect( () => { 
    const getData = () => {csv(csvData).then((response) => {
        const cleanedData = response.map(row => {
          return {
              ...row,
              assignment: shortenProjectName(row.assignment),
              difficulty: +row.difficulty,
              funFactor: +row.funFactor,
          }
      })  
      setData(cleanedData)
      })
    }
    getData();
  }, [])

  useEffect(() => {
    if(data){
    const getNames = () => {
      const names = []
          data.map((student) => {
          if(!names.find(item => item.name === student.name)) {
            names.push({name: student.name})
          }
          return names
        }) 
        return names
    }
    setNameList(getNames());
    }
    }, [data])

    useEffect(() => {
      getAverage();
  }, [data])

  const getAverage = () => {
    if(data){
      const grouped = data.reduce((groupByAssignment, obj) => {
        let key = obj["assignment"]
        if (!groupByAssignment[key]) {
          groupByAssignment[key] = []
        }
        groupByAssignment[key].push(obj)
        return groupByAssignment
      }, {})
      const averages = []
      for (const assignment in grouped) {
        const {totalDiff, totalFun} = grouped[assignment].reduce((total, obj) => {
          
          total.totalDiff += obj.difficulty
          total.totalFun += obj.funFactor

          return total

        }, {totalDiff: 0, totalFun: 0})

        const averageDiff = Math.round(((totalDiff / grouped[assignment].length) + Number.EPSILON) * 100) / 100
        const averageFun = Math.round(((totalFun / grouped[assignment].length) + Number.EPSILON) * 100) / 100
        averages.push({ 
          assignment: assignment,
          difficulty: averageDiff, 
          funFactor: averageFun, 
        })
      }
      setCurrentData(averages);
    }
  }

  const shortenProjectName = (assignmentName) => assignmentName.includes("Project") ? assignmentName.substring(17) : assignmentName;

    const getStudent = (student) => {
        return data.filter((item) => item.name === student)
    }

  const filterData = event => {
    setChoice(event.target.value)
  }

  const graphTypeHandler = event => setGraphType(event.target.value)

  const handleClick = (event) => {
    setCurrentData(getStudent(event.target.value))
  }

  const displayFilter = () => {
    if(currentData){
        if(choice === "both"){
            return currentData;
        } else if (choice === "funFactor") {
            return currentData.map(item => {
                return {...item, difficulty: null}
            })
        } else {
            return currentData.map(item => {
                return {...item, funFactor: null}
            })
        }
    }
  }

  return (
    <div className="App">
      <DisplayChart currentData={displayFilter()} graphType={graphType} choice={choice} />
      <div className='graph-menu graph-buttons'>
          <input type="radio" id="bar" name="graph" value="bar" onClick={graphTypeHandler} defaultChecked={true}/>
          <label htmlFor="bar"><FontAwesomeIcon icon={faChartColumn} /></label>
          <input type="radio" id="line" name="graph" value="line" onClick={graphTypeHandler} />
          <label htmlFor="line"><FontAwesomeIcon icon={faChartLine} /></label>
          <input type="radio" id="table" name="graph" value="table" onClick={graphTypeHandler} />
          <label htmlFor="table"><FontAwesomeIcon icon={faTable} /></label>
      </div>
      <div className='graph-menu filter-buttons'>
          <input type="radio" id="both" name="filter" value="both" onClick={filterData} defaultChecked={true}/>
          <label htmlFor="both">Both</label>
          <input className='fun-radio' type="radio" id="funFactor" name="filter" value="funFactor" onClick={filterData} />
          <label htmlFor="funFactor">Fun</label>
          <input className='diff-radio' type="radio" id="difficulty" name="filter" value="difficulty" onClick={filterData} />
          <label htmlFor="difficulty">Difficulty</label>
      </div>
      <div className='graph-menu student-buttons'>
          <input type="radio" id="classbutton" name="studentbutton" onClick={getAverage} defaultChecked={true}/>
          <label htmlFor="classbutton">Class</label>
          {nameList.map(item => {
            return <p key={item.name} style={{display: "inline-block"}} className='graph-menu student-buttons'>
              <input type="radio" id={item.name} name="studentbutton" value={item.name} onClick={handleClick} />
              <label htmlFor={item.name}>{item.name}</label>
            </p>
          })}
      </div>
    </div>
  );
}

export default App;