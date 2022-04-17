//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import "uu5chartg01";
import Config from "../routes/config/config";
//@@viewOff:imports

const Chart = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Chart",
  //@@viewOff:statics s
  
  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    const propsState = {
      data: [
        { label: "Jan", value: 45, value2: 10, value3: 40 },
        { label: "Feb", value: 10, value2: 5, value3: 20 },
        { label: "Mar", value: 5, value2: 15, value3: 30 },
        { label: "Apr", value: 20, value2: 30, value3: 10 },
        { label: "May", value: 10, value2: 5, value3: 5 },
        { label: "Jun", value: 10, value2: 20, value3: 20 },
        { label: "Jul", value: 45, value2: 10, value3: 40 },
        { label: "Aug", value: 10, value2: 5, value3: 20 },
        { label: "Sep", value: 5, value2: 15, value3: 30 },
        { label: "Oct", value: 20, value2: 30, value3: 10 },
        { label: "Nov", value: 10, value2: 5, value3: 5 },
        { label: "Dec", value: 10, value2: 20, value3: 20 }
      ],
      series: [
        {
          valueKey: "value",
          name: "První graf",
          colorSchema: "red",
          chartType: "linear"
        },
        {
          valueKey: "value2",
          name: "Druhý graf",
          colorSchema: "blue",
          chartType: "linear"
        },
      ]
    };
    //@@viewOn:render
    return (
      <UU5.Bricks.Container>

        <UU5.SimpleChart.LineChart data={propsState.data} series={propsState.series} />
      </UU5.Bricks.Container>
    )
    //@@viewOff:render
  }
});

export default Chart;