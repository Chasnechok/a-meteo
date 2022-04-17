//@@viewOn:imports
import UU5 from 'uu5g04'
import { createVisualComponent } from 'uu5g04-hooks'
import Config from '../routes/config/config'
import LogsFetcher from './logs-fetcher'
import Chart from './Chart'
import { useRef, useState } from 'uu5g05'
import Calendar from './Calendar'
//@@viewOff:imports
const CLASS_NAMES = {
    refreshButton: () => Config.Css.css`
    display: block;
    margin: 0 auto;
    span.mdi {
      transition: .3s;
    }
    &:hover > span.mdi {
      transform: rotate(180deg);
    }
  `,
}
const Sensor = createVisualComponent({
    //@@viewOn:statics
    displayName: Config.TAG + 'Chart',
    //@@viewOff:statics

    render({ sensor }) {
        //@@viewOn:private
        const modalRef = useRef()
        const calendarRef = useRef()

        if (!sensor || !sensor.data) {
            return null
        }
        function renderError(errorData, handlerMap) {
            switch (errorData.operation) {
                case 'load':
                case 'loadNext':
                default:
                    return (
                        <>
                            <UU5.Bricks.Button
                                className={CLASS_NAMES.refreshButton()}
                                onClick={() => handlerMap.load(getDtoIn(sensor.data.code))}
                            >
                                Refresh <UU5.Bricks.Icon icon="mdi-refresh" />
                            </UU5.Bricks.Button>
                            <UU5.Bricks.Error
                                content="There was an error during loading."
                                error={errorData.error}
                                errorData={errorData.data}
                            />
                        </>
                    )
            }
        }
        function renderLoading() {
            return <UU5.Bricks.Loading />
        }

        function onModalClose(handlerMap) {
            const ranges = calendarRef.current.getValue()
            const from = ranges[0]
            const to = ranges[1]
            const dtoIn = getDtoIn(sensor.data.code, from, to)
            handlerMap.load(dtoIn)
        }

        function renderReady(data, handlerMap) {
            return (
                <div>
                    <UU5.Bricks.Modal ref_={modalRef} onClose={() => onModalClose(handlerMap)} />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <UU5.Bricks.ButtonGroup>
                            <UU5.Bricks.Button
                                content="Set date ranges"
                                onClick={() =>
                                    modalRef.current.open({
                                        header: 'Set chart range',
                                        content: <Calendar calendarRef={calendarRef} />,
                                    })
                                }
                            />
                            <UU5.Bricks.Button
                                content="Refresh"
                                onClick={() => handlerMap.load(getDtoIn(sensor.data.code))}
                            />
                        </UU5.Bricks.ButtonGroup>
                    </div>
                    <Chart data={data} />
                </div>
            )
        }
        function getDtoIn(sensorCode, dateFrom, dateTo) {
            return {
                sensorCode: sensorCode,
                sortBy: 'datetime',
                order: 'asc',
                state: 'active',
                dateFrom: dateFrom || '1998-11-14T20:00:00.000Z',
                dateTo: dateTo || '2024-11-14T20:00:00.000Z',
                pageInfo: {
                    pageIndex: 0,
                    pageSize: 100,
                },
            }
        }

        //@@viewOff:private

        //@@viewOn:render
        return (
            <UU5.Bricks.Container noSpacing={true}>
                <LogsFetcher dtoIn={getDtoIn(sensor.data.code)}>
                    {({ state, data, errorData, handlerMap }) => {
                        switch (state) {
                            case 'pending':
                            case 'pendingNoData':
                                return renderLoading()
                            case 'error':
                            case 'errorNoData':
                                return renderError(errorData, handlerMap)
                            case 'itemPending':
                            case 'ready':
                            case 'readyNoData':
                            default:
                                return renderReady(data, handlerMap)
                        }
                    }}
                </LogsFetcher>
            </UU5.Bricks.Container>
        )
        //@@viewOff:render
    },
})

export default Sensor
