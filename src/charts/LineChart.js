import { VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel, VictoryGroup, VictoryZoomContainer, VictoryBrushContainer, VictoryTooltip, VictoryLine} from 'victory';

export const LineChart = ({
    zoomDomain,
    handleZoom,
    textField,
    currentData,
    selectedDomain,
    handleBrush,
}) => {

    return (
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
                <VictoryLine
                    labelComponent={<VictoryTooltip />}
                    data={currentData}
                    style={{ data: { width: "10", stroke: "#1c5858", strokeWidth: "2" } }}
                    x="assignment"
                    y="difficulty"/>
                <VictoryLine 
                    labelComponent={<VictoryTooltip />}
                    data={currentData}
                    style={{ data: { width: "10", stroke: "#f69000", strokeWidth: "2" } }}
                    x="assignment"
                    y="funFactor"/>
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
                <VictoryLine
                labelComponent={<VictoryLabel 
                className='hidden'/>}
                data={currentData}
                x="assignment"
                y="difficulty"
                />
                <VictoryLine
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
        </>
    )
}