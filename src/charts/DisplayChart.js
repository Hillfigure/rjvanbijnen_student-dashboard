import React, { useState } from 'react';
import { BarChart } from './BarChart';
import { LineChart } from './LineChart';
import { TableChart } from './TableChart';

export const DisplayChart = ({currentData, graphType, choice}) => {

    const [selectedDomain, setSelectedDomain] = useState();
    const [zoomDomain, setZoomDomain] = useState();
  
  const handleZoom = (domain) => {
      setSelectedDomain(domain);
    };
  
  const handleBrush = (domain) => {
      setZoomDomain(domain);
    };

    const textField = () => {
        if(currentData && currentData[0].name){
            return currentData[0].name;
        } else {
            return "Class Average"
        }
    }

    return (
        <>
            {graphType === "bar" ?
                <BarChart 
                    selectedDomain={selectedDomain}
                    zoomDomain={zoomDomain}
                    handleZoom={handleZoom}    
                    handleBrush={handleBrush}
                    textField={textField}
                    currentData={currentData}
                    choice={choice}
                />
                : null
            }   
            {graphType === "line" ?
                <LineChart 
                    selectedDomain={selectedDomain}
                    zoomDomain={zoomDomain}
                    handleZoom={handleZoom}    
                    handleBrush={handleBrush}
                    textField={textField}
                    currentData={currentData}
                    choice={choice}
                 />
                : null
            }   
            {graphType === "table" ?
                <TableChart currentData={currentData} textField={textField}/> : null
            }   
        </>
    )
}