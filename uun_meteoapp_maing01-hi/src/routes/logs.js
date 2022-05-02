//@@viewOn:imports
import UU5 from 'uu5g04'
import 'uu5g04-bricks'
import 'uu5g04-forms'
import { createVisualComponent } from 'uu5g04-hooks'
import Config from './config/config.js'
import LogsFetcher from '../bricks/logs-fetcher'
import Home from './home.js'
import Chart from '../bricks/Chart.js'
import { useRef } from 'uu5g05'
//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: Config.TAG + 'LogsPage',
    //@@viewOff:statics
}

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
    chart: () => Config.Css.css`
    background: white;
    padding: 1em;
    border-radius: .5em;
    filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
    max-width: 800px;
    margin-top: 1em;
    h6 {
        margin: 0 !important;
        cursor: default;
    }
    & > .chart-header {
        gap: 1em;
        z-index: 10;
        display: flex;
        padding: 1em;
        span.mdi {
            transition: .3s;
        }
        .uu5-forms-input {
            margin-top: 0 !important;
        }
        button:hover > span.mdi {
            transform: rotate(180deg);
        }
        .uu5-forms-daterangepicker-custom-content {
            button {
                width: 100%;
            }
            display: flex;
            flex-direction: column;
            gap: 1em;
            justify-content: center;
            padding: 0.5em;
        }
    }
    `,
}

export const Logs = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    //@@viewOff:defaultProps
    render({ params }) {
        if (!params.sensorCode) {
            return <Home />
        }
        const sensorCode = params.sensorCode
        const handlerMapRef = useRef()
        const datePickerRef = useRef()
        const selectedDates = useRef({})
        //@@viewOn:private
        function renderError(errorData, handlerMap) {
            switch (errorData.operation) {
                case 'load':
                case 'loadNext':
                default:
                    return (
                        <>
                            <UU5.Bricks.Button
                                className={CLASS_NAMES.refreshButton()}
                                onClick={() => handlerMap.load(getDtoIn(sensorCode))}
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

        function refreshData(dtoIn) {
            if (handlerMapRef.current) {
                handlerMapRef.current.load(dtoIn)
            }
        }
        //@@viewOff:private
        //@@viewOn:interface
        //@@viewOff:interface

        //@@viewOn:render
        return (
            <section>
                <UU5.Bricks.Container className={CLASS_NAMES.chart()} noSpacing={true}>
                    <UU5.Bricks.Header colorSchema="default" content={`Sensor - ${sensorCode}`} level="6" />
                    <UU5.Bricks.Container className="chart-header" noSpacing={true}>
                        <UU5.Forms.DateRangePicker size="s" ref_={datePickerRef} placeholder="From - To">
                            <UU5.Bricks.Row>
                                <UU5.Bricks.Button
                                    content="today"
                                    bgStyle="outline"
                                    onClick={() => {
                                        let value = new Date()
                                        datePickerRef.current.setValue(value)
                                    }}
                                />
                            </UU5.Bricks.Row>
                            <UU5.Bricks.Row>
                                <UU5.Bricks.Button
                                    content="this week"
                                    bgStyle="outline"
                                    onClick={() => {
                                        let today = new Date()
                                        let day = today.getDay() || 7
                                        let valueFrom = day !== 1 ? new Date(today.setHours(-24 * (day - 1))) : today
                                        let valueTo = new Date(new Date(valueFrom).setDate(valueFrom.getDate() + 6))
                                        datePickerRef.current.setValue([valueFrom, valueTo])
                                    }}
                                />
                            </UU5.Bricks.Row>
                            <UU5.Bricks.Row>
                                <UU5.Bricks.Button
                                    bgStyle="outline"
                                    content="this month"
                                    onClick={() => {
                                        let today = new Date()
                                        let valueFrom = new Date(new Date(today))
                                        valueFrom.setDate(1)
                                        let valueTo = new Date(new Date(today))
                                        valueTo.setMonth(valueTo.getMonth() + 1)
                                        valueTo.setDate(0)
                                        datePickerRef.current.setValue([valueFrom, valueTo])
                                    }}
                                />
                            </UU5.Bricks.Row>
                            <UU5.Bricks.Row>
                                <UU5.Bricks.Button
                                    content="this year"
                                    bgStyle="outline"
                                    onClick={() => {
                                        let today = new Date()
                                        let valueFrom = new Date(new Date(today))
                                        valueFrom.setDate(1)
                                        valueFrom.setMonth(0)
                                        let valueTo = new Date(new Date(today))
                                        valueTo.setMonth(12)
                                        valueTo.setDate(0)
                                        datePickerRef.current.setValue([valueFrom, valueTo])
                                    }}
                                />
                            </UU5.Bricks.Row>
                            <UU5.Bricks.Row>
                                <UU5.Bricks.Button
                                    content="submit"
                                    bgStyle="outline"
                                    colorSchema="green"
                                    onClick={() => {
                                        const dates = datePickerRef.current.getValue() || []
                                        const from = (selectedDates.current.from = dates[0])
                                        const to = (selectedDates.current.to = dates[1])
                                        refreshData(getDtoIn(sensorCode, from, to))
                                        datePickerRef.current.close()
                                    }}
                                />
                            </UU5.Bricks.Row>
                        </UU5.Forms.DateRangePicker>
                        <UU5.Bricks.Button
                            size="s"
                            onClick={() =>
                                refreshData(getDtoIn(sensorCode, selectedDates.current.from, selectedDates.current.to))
                            }
                        >
                            Refresh <UU5.Bricks.Icon icon="mdi-refresh" />
                        </UU5.Bricks.Button>
                    </UU5.Bricks.Container>
                    <LogsFetcher dtoIn={getDtoIn(sensorCode)}>
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
                                    handlerMapRef.current = handlerMap
                                    return <Chart data={data} />
                            }
                        }}
                    </LogsFetcher>
                </UU5.Bricks.Container>
            </section>
        )
        //@@viewOff:render
    },
})

export default Logs
