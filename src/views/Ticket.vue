<template>
<el-row style="width:100%;" class="main" type="flex" justify="center" v-if="$store.state.mobile">
        <el-col :sm="20" :md="12">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>个人信息</el-breadcrumb-item>
                <el-breadcrumb-item>问卷</el-breadcrumb-item>
                <el-breadcrumb-item class="checked">购票</el-breadcrumb-item>
                <el-breadcrumb-item >支付</el-breadcrumb-item>
                <el-breadcrumb-item >确认函</el-breadcrumb-item>
            </el-breadcrumb>
            <el-form 
                :rules="rules"
                :model="form" 
                ref="form" 
                label-width="auto"
                label-position="top"
                >
                <el-form-item prop="ticketType" label="请选择以下票型（必选）">
                    <el-radio-group v-model="form.ticketType">
                        <el-radio label="[day1]"  border>
                            一日票 80元：任意一日内无限次出入
                        </el-radio>
                        <el-radio label="[day2]"  border>
                            二日票 140元：任意二日内无限次出入
                        </el-radio>
                        <el-radio label="[day4]"  border>
                            四日票 220元：四日之内无限次出入
                        </el-radio>                                                
                    </el-radio-group>
                </el-form-item >
                <el-form-item label="是否需要选购以下副票：" >
                    <el-checkbox-group v-model="form.ticketType2" >
                        <el-checkbox label="[t1]" border>限量馆 80元</el-checkbox>
                        <el-checkbox label="[t2]" border>神秘手册 50元</el-checkbox>
                        <el-checkbox label="[t3]" border>巴士票 0元 
                            (客服人员将主动联系您<br>以确定出行计划)</el-checkbox>
                        <el-checkbox label="[t4]" border>设计周门票（1日） 55元</el-checkbox>
                    </el-checkbox-group>   
                </el-form-item>
                                 
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">提交</el-button>
                </el-form-item>
            </el-form>
        </el-col>
  </el-row>
</template>

<script>
export default {
    data(){
        return{
            form:{
                ticketType:'',
                ticketType2:[]
            },
            rules:{
                ticketType:[
                    {required:true,message:'必选',trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        submitForm(formName){
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    alert('submit')
                    this.$store.commit('changeOrder',{ticketType:this.form.ticketType,ticketType2:this.form.ticketType2})
                    this.$router.push({path:'/order'})

                }else{
                    console.log('error');
                    return false;
                }
            })
        },
        checkProcess(){//获取步骤代码以判断是否完成上一步操作
            this.$axios.post('/checkProcess',{mobile:this.$store.state.mobile}).then(res=>{
                var response=res.data.result[0].response
                if(response.indexOf('[USER-SURV]')<0){
                    console.log('未成survey，回到上一页')
                    this.$router.push({path:'/userInfo'})
                }else if(response.indexOf('[USER-PAY]')>=0){
                    console.log('已完成支付，前往下一页')
                    this.$router.push({path:'/comfirmation'})
                }
            })
        }        
    },
    mounted(){
        this.checkProcess()
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
.el-radio,.el-checkbox{
    display:block;
    margin:10px;
    padding:10px;
    text-align:left;
    color:white;
    margin-top:20px;
    height:auto;
}
.el-breadcrumb__item{
    margin-bottom:10px;
}
</style>