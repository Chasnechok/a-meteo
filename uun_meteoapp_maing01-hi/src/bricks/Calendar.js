//@@viewOn:imports
import UU5 from 'uu5g04'
import { createVisualComponent } from 'uu5g04-hooks'
import Config from '../routes/config/config'
import 'uu5chartg01'
import dayjs from 'dayjs'
import { useState } from 'uu5g05'

//@@viewOff:imports

const Calendar = createVisualComponent({
    //@@viewOn:statics
    displayName: Config.TAG + 'Calendar',
    //@@viewOff:statics

    render({ calendarRef }) {
        //@@viewOn:private

        //@@viewOff:private
        //@@viewOn:render
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <UU5.Bricks.Calendar ref_={calendarRef} selectionMode={'range'} showTodayButton={true} />
            </div>
        )
        //@@viewOff:render
    },
})

export default Calendar
