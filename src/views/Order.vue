<template>
  <el-row style="width:100%;" class="main" type="flex" justify="center" v-if="$store.state.mobile">
        <el-col :sm="20" :md="12">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>个人信息</el-breadcrumb-item>
                <el-breadcrumb-item>问卷</el-breadcrumb-item>
                <el-breadcrumb-item >购票</el-breadcrumb-item>
                <el-breadcrumb-item class="checked">支付</el-breadcrumb-item>
                <el-breadcrumb-item >确认函</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="body">
                <ul v-for="(item,index) in arr" :key="index">
                    <li class="myli">
                        <span>{{item.name}}</span>
                        <span>{{item.price}}</span>
                    </li>
                </ul>
                <h4 style="text-align:right; margin-right:20px;">总计：<span>{{total}}</span></h4>
            </div>
            <el-button type="primary" @click="pay">前往付款</el-button>

        </el-col>
  </el-row>
</template>

<script>
const priceList={
    "[day1]":{name:'一日票',price:80},
    "[day2]":{name:'二日票',price:140},
    "[day4]":{name:'四日票',price:220},
    "[t1]":{name:'限量馆',price:80},
    "[t2]":{name:'神秘手册',price:50},
    "[t3]":{name:'巴士票',price:0},
    "[t4]":{name:'设计周门票',price:55}
    }

export default {
    data(){
        return{
            priceList:priceList,
            ticketType:'',
            ticketType2:[],
            total:'',//总价
            arr:[]//已选全部票型+价格[{name:xxx,price:xxx},{}....]
        }
    },
    methods:{
        getData(){
                this.ticketType=this.$store.state.ticketType
                this.ticketType2=this.$store.state.ticketType2
                console.log
                if(!this.$store.state.ticketType){
                    this.$router.push({path:'/ticket'})
                } 
        },

        getPrice(){
            let arr=[]
            let j1=this.ticketType
            let p1=this.priceList[j1].price
            arr.push(this.priceList[j1])
            let j2=this.ticketType2
            let p2=0
            j2.forEach(item=>{
                p2+=this.priceList[item].price
                arr.push(this.priceList[item])
            })
            let total=p1+p2
            this.arr=arr
            this.total=total
            console.log(arr)
        },

        async Total(){
            await this.getData();
            await this.getPrice();
            await console.log(this.total)
        },

        pay(){
            this.$axios.post('/response/ticket',{
                mobile:this.$store.state.mobile,
                response:(this.ticketType+this.ticketType2.toString()).replace(/,/g,"")
            }).then(res=>{
                console.log(res)
                this.$router.push({path:'/comfirmation'})
            })
        }
    },
    mounted(){
        this.Total()
    }
}
</script>

<style scoped> 
    #app{
        height:100%;
    }
    .myli{
        margin:20px;
    }
    .myli span:first-child{
        float:left;
    }
    .myli span:last-child{
        float:right;
    }
    .el-breadcrumb{
        margin:20px;
    }
    .checked >>> .el-breadcrumb__inner{
        color:white;
        font-weight: 700;
    }    
    .el-breadcrumb__item{
    margin-bottom:10px;
}
</style>