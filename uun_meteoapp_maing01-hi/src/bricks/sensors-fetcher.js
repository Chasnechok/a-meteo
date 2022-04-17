//@@viewOn:imports
import { createComponent, useDataList } from 'uu5g04-hooks'
import Config from '../config/config'
import Calls from 'calls'
//@@viewOff:imports

const SensorFetcher = createComponent({
    //@@viewOn:statics
    displayName: Config.TAG + 'LocationFetcher',

    //@@viewOff:statics

    render({ children, pageSize }) {
        let listDataValues = useDataList({
            pageSize: pageSize || 100,
            handlerMap: {
                load: Calls.listSensors,
            },
            skipInitialLoad: false,
            initialDtoIn: {
                sortBy: 'name',
                order: 'asc',
                state: 'initial',
            },
        })
        let { state, data, errorData, handlerMap } = listDataValues
        //@@viewOn:private

        //@@viewOff:private
        //@@viewOn:render
        return children({
            state,
            data,
            errorData,
            handlerMap,
        })
        //@@viewOff:render
    },
})

export default SensorFetcher
