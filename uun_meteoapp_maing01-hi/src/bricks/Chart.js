//@@viewOn:imports
import UU5 from 'uu5g04'
import { createVisualComponent } from 'uu5g04-hooks'
import Config from '../routes/config/config'
import 'uu5chartg01'
import dayjs from 'dayjs'

//@@viewOff:imports

const Chart = createVisualComponent({
    //@@viewOn:statics
    displayName: Config.TAG + 'Chart',
    //@@viewOff:statics

    render({ data }) {
        //@@viewOn:private
        const series = [
            {
                valueKey: 'humidity',
                name: 'Humidity',
                colorSchema: 'blue',
                chartType: 'natural',
            },
            {
                valueKey: 'temperature',
                name: 'Temperature',
                colorSchema: 'red',
                chartType: 'natural',
            },
        ]

        function parseData(data) {
            if (!data || !data.length) return
            return data.map(({ data: metric }) => ({
                label: dayjs(metric.datetime).format('DD MMM HH:mm'),
                temperature: metric.temperature,
                humidity: metric.humidity,
            }))
        }
        const metrics = parseData(data)

        //@@viewOff:private
        //@@viewOn:render
        return metrics?.length ? (
            <UU5.SimpleChart.LineChart displayLegend series={series} data={metrics} />
        ) : (
            <div>No data for the specified period available</div>
        )
        //@@viewOff:render
    },
})

export default Chart
