//@@viewOn:imports
import UU5 from 'uu5g04'
import { createVisualComponent } from 'uu5g04-hooks'
import Config from '../routes/config/config'
import Sensor from './Sensor'
import SensorFetcher from './sensors-fetcher'
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
    locationList: () => Config.Css.css`
    background: white;
    padding: 1em;
    border-radius: .5em;
    filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
    `,
    locationListHeader: () => Config.Css.css`
    display: flex;
    padding: 1em;
    border-bottom: 1px solid #6b7280;
    font-weight: bold;
    cursor: default;
    & > div {
        flex: 1;
    }
    `,
}

const LocationList = createVisualComponent({
    //@@viewOn:statics
    displayName: Config.TAG + 'LocationList',
    //@@viewOff:statics

    render({ locations }) {
        //@@viewOn:private
        //@@viewOff:private
        if (!locations || !locations.length) {
            return 'No locations found for AWID'
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
                                onClick={() =>
                                    handlerMap.load({
                                        sortBy: 'name',
                                        order: 'asc',
                                        state: 'initial',
                                    })
                                }
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
        function renderReady(data) {
            return locations.map(({ data: location }, i) =>
                data
                    .filter(({ data: sensor }) => sensor.locationCode == location.locationCode)
                    .map(({ data: sensor }) => <Sensor key={sensor.id} location={location} sensor={sensor} />)
            )
        }
        //@@viewOn:render
        return (
            <UU5.Bricks.Container className={CLASS_NAMES.locationList()} noSpacing={true}>
                <UU5.Bricks.Container className={CLASS_NAMES.locationListHeader()} noSpacing={true}>
                    {['Sensor', 'Current temperature', 'Current humidity'].map((col) => (
                        <UU5.Bricks.Container key={col.replace(/\s/g, '')} noSpacing={true}>
                            {col}
                        </UU5.Bricks.Container>
                    ))}
                </UU5.Bricks.Container>
                <SensorFetcher>
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
                                return renderReady(data)
                        }
                    }}
                </SensorFetcher>
            </UU5.Bricks.Container>
        )
        //@@viewOff:render
    },
})

export default LocationList
