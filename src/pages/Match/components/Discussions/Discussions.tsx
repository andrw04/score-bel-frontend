import { FC } from "react"
import Vote from "./Vote"

type PropsType = {

}

const Discussions: FC<PropsType> = () => {
    return (<Vote homeTeam={"Челси"} awayTeam={"Астон Вилла"}></Vote>)
}

export default Discussions