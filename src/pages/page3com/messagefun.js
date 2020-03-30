import Vue from 'vue'
import Message from './message.vue'

const Msg = Vue.extend(Message);
export default  (options={}) => {
    const instance = new Msg({
        el:document.createElement('div'),
        data(){
            return{
                label:options.label
            }
        }
    })
    document.body.appendChild(instance.$el);
    window.setTimeout(()=>{
        instance.$data.show=false
    },options.time?options.time:3000)
}