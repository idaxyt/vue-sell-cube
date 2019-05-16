<template>
    <div class='tip'>
        <span class="tipbox" :style="item" v-for="(item,index) of DataClass" :key='index'>{{Data[index]}}</span>
    </div>
</template>

<script>
const Color = ['blue','yellow','orange','red']
export default {
    name: 'DangerTip',
    props: {
        Data: {
            type: Array
        },
        height: {
            type: Number
        },
        width: {
            type: Number
        }
    },
    computed: {
        DataClass() {
            let result = []
            let total = this.Data.reduce((total,num) => {
                return total+num
            })
            for(let i = 0; i < this.Data.length; i++) {
                let obj = {}
                obj['width'] = (this.Data[i]/total*this.width).toFixed(1)+'px'
                obj['height'] = this.height+'px'
                obj['background-color'] = Color[i]
                result.push(obj)
            }   
            return result
        }
    }
}
</script>

<style scoped>
.tip {
    display: flex;
    align-items: center;
    justify-content: center;
}
.tipbox {
    color: black;
    font-size: 16px;
    text-align: center;
    line-height: 30px;
}
</style>
