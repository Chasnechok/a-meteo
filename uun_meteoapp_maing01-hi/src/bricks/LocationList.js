//@@viewOn:imports
import UU5 from 'uu5g04'
import { createVisualComponent } from 'uu5g04-hooks'
import Config from '../routes/config/config'
import SensorList from './SensorList'
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
            return (
                <UU5.Bricks.Accordion
                    onClickNotCollapseOthers
                    iconExpanded="mdi-chevron-up"
                    iconCollapsed="mdi-chevron-down"
                >
                    {locations.map(({ data: location }, i) => (
                        <UU5.Bricks.Panel
                            key={location.code}
                            id={location.code}
                            name={location.name}
                            expanded={!i}
                            header={location.name}
                        >
                            <SensorList
                                sensors={data.filter(
                                    ({ data: sensor }) => sensor.locationCode == location.locationCode
                                )}
                            />
                        </UU5.Bricks.Panel>
                    ))}
                </UU5.Bricks.Accordion>
            )
        }
        //@@viewOn:render
        return (
            <UU5.Bricks.Container noSpacing={true}>
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
