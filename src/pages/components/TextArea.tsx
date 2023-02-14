import { useEffect, useRef, useState } from "react";

const TextArea = (props: Text) => {
  const [value, setValue] = useState("");
  const [height, setHeight] = useState(0);
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      setHeight(0);
    }
  }, [value]);

  useEffect(() => {
    if (!height && textAreaRef.current) {
      setHeight(textAreaRef.current.scrollHeight);
    }
  }, [height]);

  function handleChangeValue(value: string) {
    setValue(value);
    Text(value);
  }

  return (
    <>
      <textarea
        ref={textAreaRef}
        name="text"
        className="text"
        cols={30}
        rows={1}
        placeholder="ここにテキストを入力"
        value={value}
        onChange={(evt) => handleChangeValue(evt.target.value)}
        style={{ height: height ? `${height}px` : "auto" }}
      />
      <style jsx>{`
        .text {
          width: 800px;
          padding-top: 10px;
          padding-left: 15px;
          height: auto;
        }
      `}</style>
    </>
  );
};
export default TextArea;
