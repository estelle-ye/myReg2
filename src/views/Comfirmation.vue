<template>
  <el-row style="width:100%;" class="main" type="flex" justify="center" v-if="$store.state.mobile">
        <el-col :sm="20" :md="12">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>个人信息</el-breadcrumb-item>
                <el-breadcrumb-item >问卷</el-breadcrumb-item>
                <el-breadcrumb-item >购票</el-breadcrumb-item>
                <el-breadcrumb-item >支付</el-breadcrumb-item>
                <el-breadcrumb-item class="checked">确认函</el-breadcrumb-item>
            </el-breadcrumb>
            <h3>尊敬的{{name}}</h3>
            <h3>入场码</h3>
                <vue-qr ref="Qrcode" 
                        :text="dataObj.text" 
                ></vue-qr>
            <div class="ticket">
                <span v-for="(item,index) in arr" :key="index">{{item.name}}&nbsp;/&nbsp;</span>
            </div>
            <div class="tips">
                <h5>注意事项：</h5>
                <span style="display:inline-block;margin:0 20px;">
                    本次展会采取实名制认证，请确保个人信息与身份证相符<br>
                    设计深圳为专业展，16岁以下儿童不得入场<br>
                    关于注册观展“设计上海”，如有任何问题请与我们的团队取得联系：<br>
                    电邮：bookings@designshanghai.com；电话： 0086 (0)21 6407 9697。<br>
                </span>
            </div>
        </el-col>
  </el-row>
</template>

<script>
import VueQr from 'vue-qr'
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
    components: { VueQr },
    data () {
        return {
            name:'',
            priceList:priceList,
            arr:[],//已选全部票型+价格[{name:xxx,price:xxx},{}....]
            dataObj: {
                text: ''
            }
        }
    },
    methods:{
        getData(){
            this.$axios.post('/confirmation',{
                mobile:this.$store.state.mobile
            }).then(res=>{
                var response=res.data[0].response
                if(response.indexOf("[USER-PAY]")<0){
                    console.log('未完成支付，返回上一页')
                    this.$router.push('/ticket')
                }else{
                    this.dataObj.text=(res.data[0]['10deg']).toString()
                    this.name=res.data[0].name
                    var Allcode=["[day1]","[day2]","[day4]","[t1]","[t2]","[t3]","[t4]"]
                    var arr=[]
                    Allcode.forEach(item=>{
                        if((res.data[0].response).indexOf(item)!==-1){
                            arr.push(this.priceList[item])
                        }
                        
                    })
                    this.arr=arr
                    console.log(this.arr)
                }

            })
        },         
    },
    mounted(){
        this.getData()
        
    }

}
</script>

<style scoped>
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