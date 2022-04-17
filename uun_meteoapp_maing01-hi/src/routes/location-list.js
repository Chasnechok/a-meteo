import UU5 from "uu5g04";
import Uu5Tiles from "uu5tilesg02";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";

const locationList = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "locationList",
  //@@viewOff:statics

  render() {
    //@@viewOn:private
    //@@viewOff:private

    const columns = `<uu5json/>[
    {"header":"ID"},
    {"header":"lokace"},
  ]`;
    //const DataJSONWithoutTypes = DataJSON.map((item) => item.map((itemItem) => itemItem + ""));

  //const columns={[{ header: "Name" }, { header: "Surname", textAlignment: "right" }]}
    //@@viewOn:render

    return (
      <UU5.Bricks.Container>
       
      UU5.Tiles.List data={}
        
      </UU5.Bricks.Container>
    );
  },
});
export default locationList;
