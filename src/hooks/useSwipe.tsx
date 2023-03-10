import { computed, onMounted,onUnmounted,Ref,ref } from "vue";

type Point={
    x:number,
    y:number
}

interface Options{
    beforeStart?:(e:TouchEvent)=> void
    beforeMove?:(e:TouchEvent)=> void
    beforeEnd?:(e:TouchEvent)=> void
    afterStart?:(e:TouchEvent)=> void
    afterMove?:(e:TouchEvent)=> void
    afterEnd?:(e:TouchEvent)=> void
}
export const useSwipe=(element:Ref<HTMLElement | undefined>,options?:Options)=>{
    const start =ref<Point>()
    const end =ref<Point>()
    const swipeing=ref(false)

    const distance=computed(()=>{
        if(!start.value || !end.value){ return undefined}
        return{
            x:end.value.x-start.value.x,
            y:end.value.y-start.value.y
        }
    })

    const direction=computed(()=>{
        if(!swipeing.value){return ""}
        if(!distance.value){return ""}
        const { x , y } =distance.value
        if(Math.abs(x)>Math.abs(y)){
            return x>0? "right" : "left"
        }
        else{
            return y>0? "down" : "up"
        }
    })
    const onStart=(e:TouchEvent)=>{
        options?.beforeStart?.(e)
        start.value={
            x:e.touches[0].clientX,
            y:e.touches[0].clientY
        }
        options?.afterStart?.(e)
    }
    const onMove=(e:TouchEvent)=>{
        options?.beforeMove?.(e)
        end.value={
            x:e.touches[0].clientX,
            y:e.touches[0].clientY
        }
        swipeing.value=true
        options?.afterMove?.(e)
    }
    const onEnd=(e:TouchEvent)=>{
        options?.beforeEnd?.(e)
        swipeing.value=false
        options?.afterEnd?.(e)
    }
    onMounted(()=>{
        element.value?.addEventListener("touchstart",onStart)
        element.value?.addEventListener("touchmove",onMove)
        element.value?.addEventListener("touchend",onEnd)
    })
    onUnmounted(()=>{
        element.value?.removeEventListener("touchstart",onStart)
        element.value?.removeEventListener("touchmove",onMove)
        element.value?.removeEventListener("touchend",onEnd)
    })

    return {
        swipeing ,distance,direction 
    }
}