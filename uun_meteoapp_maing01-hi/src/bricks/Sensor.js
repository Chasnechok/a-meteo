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
    sensorHeader: () => Config.Css.css`
    display: flex;
    align-items: center;
    padding: 1em 1em;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    text-decoration: none;
    color: #1f2937 !important; 
    &:hover {
        background-color: #f3f4f6;
    }
    & p {
        margin: 0;
        padding: 0;
    }
    & p:first-child {
        font-size: 0.9em;
        font-weight: bolder;
    }
    & > div {
        flex: 1;
    }
    & span {
        
    }
    
  `,
}
const Sensor = createVisualComponent({
    //@@viewOn:statics
    displayName: Config.TAG + 'Sensor',
    //@@viewOff:statics

    render({ sensor, location }) {
        //@@viewOn:private

        if (!sensor) {
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

        function renderReady(data, handlerMap) {
            const latestTemperature = data[data.length - 1]?.temperature
            const latestHumidity = data[data.length - 1]?.humidity
            return (
                <UU5.Bricks.Link
                    href={`${UU5.Environment.getAppBasePath()}logs?sensorCode=${sensor.code}`}
                    target="_blank"
                    className={CLASS_NAMES.sensorHeader()}
                    noSpacing={true}
                >
                    <UU5.Bricks.Container noSpacing={true}>
                        <p>{sensor.name}</p>
                        <p>{location.name}</p>
                    </UU5.Bricks.Container>
                    <UU5.Bricks.Container noSpacing={true}>
                        <span>
                            {latestTemperature
                                ? `${latestTemperature} °C / ${(latestTemperature * 9) / 5 + 32} °F`
                                : 'N/A'}
                        </span>
                    </UU5.Bricks.Container>
                    <UU5.Bricks.Container noSpacing={true}>
                        {latestHumidity ? `${latestHumidity} %` : 'N/A'}
                    </UU5.Bricks.Container>
                </UU5.Bricks.Link>
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
                <LogsFetcher dtoIn={getDtoIn(sensor.code)}>
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
                                return renderReady(
                                    data.map((r) => r.data),
                                    handlerMap
                                )
                        }
                    }}
                </LogsFetcher>
            </UU5.Bricks.Container>
        )
        //@@viewOff:render
    },
})

export default Sensor
