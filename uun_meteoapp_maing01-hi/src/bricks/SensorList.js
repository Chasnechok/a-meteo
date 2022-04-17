//@@viewOn:imports
import UU5 from 'uu5g04'
import { createVisualComponent } from 'uu5g04-hooks'
import Config from '../routes/config/config'
import Sensor from './Sensor'
//@@viewOff:imports

const SensorList = createVisualComponent({
    //@@viewOn:statics
    displayName: Config.TAG + 'SensorList',
    //@@viewOff:statics

    render({ sensors }) {
        //@@viewOn:private
        //@@viewOff:private
        if (!sensors || !sensors.length) {
            return 'No sensors found for location'
        }
        //@@viewOn:render
        return (
            <UU5.Bricks.Container noSpacing={true}>
                {sensors.map((sensor) => (
                    <Sensor key={sensor.data.id} sensor={sensor} />
                ))}
            </UU5.Bricks.Container>
        )
        //@@viewOff:render
    },
})

export default SensorList
