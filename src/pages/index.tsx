import { exit } from "process";
import { ChangeEvent, useEffect, useState } from "react";
import TextArea from "./components/TextArea";

export default function Home() {
  const [res, setRes]: any = useState();
  const [soundUrl, setSoundUrl]: any = useState();
  // const text: string = "voicevoxのapiを使ったアプリケーションのテストです";
  const [text, setText] = useState<string>("");
  const preset_id: number = 1;
  const speaker = 1;
  const [creatingSound, setCreatingSound] = useState<boolean>(false);

  useEffect(() => {}, []);

  const genarateAudioQuery = () => {
    setCreatingSound(false);
    fetch(
      "http://localhost:50021/audio_query_from_preset?text=" +
        text +
        "&preset_id=" +
        preset_id,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("audio_query_from_preset の成功");
        console.log(responseJson);
        // setRes(responseJson);
        fetch(
          "http://localhost:50021/synthesis?speaker=" +
            speaker +
            "&enable_interrogative_upspeak=true",
          {
            method: "POST",
            headers: {
              Accept: "audio/wav",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(responseJson),
          }
        )
          .then((response) => {
            console.log("synthesis の成功");

            return response.blob();
          })
          .then((blob) => {
            const url = URL.createObjectURL(blob);
            setSoundUrl(url);
            setCreatingSound(true);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error("失敗", error);
      });
    return;
  };

  const downloadWav = () => {
    // fetch(
    //   "http://localhost:50021/synthesis?speaker=" +
    //     speaker +
    //     "&enable_interrogative_upspeak=true",
    //   {
    //     method: "POST",
    //     headers: {
    //       Accept: "audio/wav",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(res),
    //   }
    // )
    //   .then((response) => {
    //     console.log("synthesis の成功");

    //     return response.blob();
    //   })
    //   .then((blob) => {
    //     const url = URL.createObjectURL(blob);
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.download = "audio.wav";
    //     link.click();
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    const link = document.createElement("a");
    link.href = soundUrl;
    link.download = "audio.wav";
    link.click();
  };
  const playAudio = () => {
    // fetch(
    //   "http://localhost:50021/synthesis?speaker=" +
    //     speaker +
    //     "&enable_interrogative_upspeak=true",
    //   {
    //     method: "POST",
    //     headers: {
    //       Accept: "audio/wav",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(res),
    //   }
    // )
    //   .then((response) => {
    //     console.log("synthesis の成功");

    //     return response.blob();
    //   })
    //   .then((blob) => {
    //     const url = URL.createObjectURL(blob);
    //     let sound = new Audio(url);
    //     sound.play();
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    let sound = new Audio(soundUrl);
    sound.play();
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    console.log(text);
  };
  const propHandlechange = handleChange;

  return (
    <>
      <section>
        <div>voicevox web app (仮)</div>
        <div className="inputs">
          {/* <TextArea Text={setText}></TextArea> */}
          <textarea
            name="text"
            className="text"
            cols={30}
            rows={1}
            placeholder="ここにテキストを入力"
            onChange={(e) => handleChange(e)}
          ></textarea>
          <input
            className="button"
            type="button"
            value="生成"
            onClick={() => {
              if (text != "") genarateAudioQuery();
            }}
          />
          <input
            className={creatingSound ? "button" : "blockButton"}
            type="button"
            value="再生"
            onClick={() => {
              playAudio();
            }}
          />
          <input
            className={creatingSound ? "button" : "blockButton"}
            type="button"
            value="ダウンロード"
            onClick={() => {
              downloadWav();
            }}
          />
        </div>
      </section>

      <style jsx>{`
        section {
          width: 100%;
          display: flex;
          margin-top: 200px;
          flex-direction: column;
          flex: center;
          text-align: center;
        }
        input {
          margin: 20px;
        }
        .inputs {
          width: 100%;
          display: flex;
          flex-direction: column;
          flex: center;
          text-align: center;
          align-content: center;
          align-items: center;
        }
        .text {
          width: 800px;
          padding: 10px;
          height: auto;
        }
        .button {
          width: 100px;
          flex: center;
          text-align: center;
        }
        .blockButton {
          pointer-events: none;
          filter: grayscale(80%);
          background-color: gray;
          width: 100px;
          flex: center;
          text-align: center;
        }
      `}</style>
    </>
  );
}
