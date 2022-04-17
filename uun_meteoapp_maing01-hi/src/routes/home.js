//@@viewOn:imports
import UU5 from 'uu5g04'
import 'uu5g04-bricks'
import { createVisualComponent } from 'uu5g04-hooks'
import Config from './config/config.js'
//import Lsi from "../config/lsi.js";
import LocationsFetcher from '../bricks/locations-fetcher'
import LocationList from '../bricks/LocationList.js'
//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: Config.TAG + 'Home',
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
}

export const Home = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    //@@viewOff:defaultProps
    render() {
        //@@viewOn:private
        function renderError(errorData, handlerMap) {
            switch (errorData.operation) {
                case 'load':
                case 'loadNext':
                default:
                    return (
                        <>
                            <UU5.Bricks.Button className={CLASS_NAMES.refreshButton()} onClick={handlerMap.load}>
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
            return <LocationList locations={data} />
        }
        //@@viewOff:private
        //@@viewOn:interface
        //@@viewOff:interface

        //@@viewOn:render
        return (
            <section className="homeSection">
                <UU5.Bricks.Container>
                    <LocationsFetcher>
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
                    </LocationsFetcher>
                </UU5.Bricks.Container>
            </section>
        )
        //@@viewOff:render
    },
})

export default Home
