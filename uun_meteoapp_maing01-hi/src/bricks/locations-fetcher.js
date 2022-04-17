//@@viewOn:imports
import { createComponent, useDataList } from 'uu5g04-hooks'
import Config from '../config/config'
import Calls from 'calls'
//@@viewOff:imports

const LocationFetcher = createComponent({
    //@@viewOn:statics
    displayName: Config.TAG + 'LocationFetcher',

    //@@viewOff:statics

    render({ children }) {
        let listDataValues = useDataList({
            handlerMap: {
                load: Calls.listLocations,
            },
            skipInitialLoad: false,
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

export default LocationFetcher
