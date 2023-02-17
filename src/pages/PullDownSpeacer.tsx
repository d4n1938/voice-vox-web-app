const PullDownSpeacer = (props:any) => {
  const speacers = require("../../speakers.json")

  const pulldown = () => {
    let list:any = []
      speacers.map((speaker:any, index:number)=>{
        list.push(<option value={index} key={index}>{speaker.name}</option>)
      })
    return list
  }

  const changeChr = (e:any)=> {
    console.log("e.target.value")
    console.log(e.target.value)
    props.changeChara(speacers[e.target.value]["styles"][0]["id"])
    
  }

   return (
     <>
     <select name="speacer" id="speaker" onChange={(e)=>changeChr(e)}>
        {pulldown()}
     </select>

{/* style--------------------------------------------------- */}
<style jsx>
 {`
`}
</style>
     </>
   );
}
export default PullDownSpeacer;