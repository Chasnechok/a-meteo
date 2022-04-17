//@@viewOn:imports
import { createComponent, useDataList } from 'uu5g04-hooks'
import Config from '../config/config'
import Calls from 'calls'
//@@viewOff:imports

const LogsFethcer = createComponent({
    //@@viewOn:statics
    displayName: Config.TAG + 'LogsFethcer',

    //@@viewOff:statics

    render({ children, pageSize, dtoIn }) {
        let listDataValues = useDataList({
            pageSize: pageSize || 100,
            handlerMap: {
                load: Calls.getLogsBySensor,
            },
            skipInitialLoad: false,
            initialDtoIn: dtoIn,
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

export default LogsFethcer
