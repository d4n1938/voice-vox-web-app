import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
  ChangeEvent,
} from "react";

const PullDownSpeacer = (props: { changeChara: (arg0: any) => void }) => {
  const speacers = require("../../speakers.json");

  type Speaker = {
    name:
      | string
      | number
      | boolean
      | ReactElement<any, string | JSXElementConstructor<any>>
      | ReactFragment
      | ReactPortal
      | null
      | undefined;
  };

  const pulldown = () => {
    let list: JSX.Element[] = [];
    speacers.map((speaker: Speaker, index: number) => {
      list.push(
        <option value={index} key={index}>
          {speaker.name}
        </option>
      );
    });
    return list;
  };

  const changeChr = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log("e.target.value");
    console.log(e.target.value);
    props.changeChara(speacers[e.target.value]["styles"][0]["id"]);
  };

  return (
    <>
      <select name="speacer" id="speaker" onChange={(e) => changeChr(e)}>
        {pulldown()}
      </select>

      {/* style--------------------------------------------------- */}
      <style jsx>{``}</style>
    </>
  );
};
export default PullDownSpeacer;
