import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel, VictoryGroup, VictoryZoomContainer, VictoryBrushContainer, VictoryTooltip} from 'victory';

export const BarChart = ({
    zoomDomain,
    handleZoom,
    textField,
    currentData,
    selectedDomain,
    handleBrush,
}) => {


    return (
        currentData ? 
        <>
            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={15}
                height={400}
                width={1900}
                containerComponent={
                    <VictoryZoomContainer
                    responsive={false}
                    zoomDimension="x"
                    zoomDomain={zoomDomain}
                    onZoomDomainChange={handleZoom}
                    allowZoom={false}
                    />
                }
            >
            <VictoryLabel
                text={textField()}
                style={{ fontSize: "25px", fontWeight: "bold"}}
                textAnchor="middle"
                x={900}
                y={15}
                />
            <VictoryAxis 
                tickLabelComponent={<VictoryLabel angle={-20} lineHeight={[2]} style={[{ fontWeight: "300", fontSize: "12" }]}/>}
                tickFormat={(x) => x}
            />
            <VictoryAxis
                dependentAxis
                tickValues={[1, 2, 3, 4, 5]}
            />
            <VictoryGroup offset={10}>
                <VictoryBar
                style={{ data: { fill: "#1c5858", width: "10", stroke: "#000", strokeWidth: "0.5" } }}
                labelComponent={<VictoryTooltip />}
                data={currentData}
                x="assignment"
                y="difficulty"
                />
                <VictoryBar
                style={{ data: { fill: "#f69000", width: "10", stroke: "#000", strokeWidth: "0.5" } }}
                labelComponent={<VictoryTooltip />}
                data={currentData}
                x="assignment"
                y="funFactor"
                />
            </VictoryGroup>
            </VictoryChart>

            <div className='center-div'>
            <VictoryChart
                theme={VictoryTheme.grayscale}
                domainPadding={15}
                height={175}
                width={800}
                scale={{ x: "time" }}
                containerComponent={
                    <VictoryBrushContainer
                    responsive={false}
                    brushDimension="x"
                    brushDomain={selectedDomain}
                    onBrushDomainChange={handleBrush}
                    />
                }
            >
            <VictoryAxis 
                tickLabelComponent={<VictoryLabel style={[{ fill: "white" }]}/>}
                tickFormat={(x) => x}
            />
            <VictoryAxis
                dependentAxis
                tickLabelComponent={<VictoryLabel style={[{ fill: "white" }]}/>}
                tickValues={[1, 2, 3, 4, 5]}
            />
            <VictoryGroup offset={4}>
                <VictoryBar
                labelComponent={<VictoryLabel 
                className='hidden'/>}
                data={currentData}
                x="assignment"
                y="difficulty"
                />
                <VictoryBar
                labelComponent={<VictoryLabel 
                    className='hidden'
                    />}
                data={currentData}
                x="assignment"
                y="funFactor"
                />
            </VictoryGroup>
            </VictoryChart>
            </div>
            </> : null
    )
}