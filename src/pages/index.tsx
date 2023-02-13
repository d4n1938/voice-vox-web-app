import { exit } from "process";
import { ChangeEvent, useEffect, useState } from "react";

export default function Home() {
  const [res, setRes]: any = useState();
  // const text: string = "voicevoxのapiを使ったアプリケーションのテストです";
  const [text, setText] = useState<string>("");
  const preset_id: number = 1;
  const speaker = 1;

  useEffect(() => {}, []);

  const genarateAudioQuery = () => {
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
        setRes(responseJson);
        return;
      })
      .catch((error) => {
        console.error("失敗", error);
      });
    return;
  };

  const downloadWav = () => {
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
        body: JSON.stringify(res),
      }
    )
      .then((response) => {
        console.log("synthesis の成功");

        return response.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "audio.wav";
        link.click();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const playAudio = () => {
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
        body: JSON.stringify(res),
      }
    )
      .then((response) => {
        console.log("synthesis の成功");

        return response.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        let sound = new Audio(url);
        sound.play();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    console.log(text);
  };

  return (
    <>
      <section>
        <div>voice vox web app (仮)</div>
        <input type="text" onChange={(e) => handleChange(e)} />
        <input
          type="button"
          value="生成"
          onClick={() => {
            genarateAudioQuery();
          }}
        />
        <input
          type="button"
          value="再生"
          onClick={() => {
            playAudio();
          }}
        />
        <input
          type="button"
          value="ダウンロード"
          onClick={() => {
            downloadWav();
          }}
        />
      </section>
      <style jsx>{`
        section {
          width: 100%;
          display: flex;
          flex-direction: column;
          flex: center;
          text-align: center;
        }
      `}</style>
    </>
  );
}
