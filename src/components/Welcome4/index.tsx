
import s from "../WelcomeLayout/style.module.scss"
import cloud from "../../assets/icons/cloud.svg"
import {RouterLink} from "vue-router"
import {WelcomeLayout} from "../WelcomeLayout"
export const Welcome4 = () => {
    return () => (
        <WelcomeLayout>
            {{
                icon:()=><img src={cloud} />,
                title:()=><h2>云备份<br />再也不怕数据丢失</h2>,
                 
            }}
        </WelcomeLayout>
    )
  }
