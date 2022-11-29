<template>
    <el-row style="width:100%;" class="main" type="flex" justify="center" v-if="$store.state.mobile"> 
        <el-col :sm="20" :md="12">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>个人信息</el-breadcrumb-item>
                <el-breadcrumb-item class="checked">问卷</el-breadcrumb-item>
                <el-breadcrumb-item >购票</el-breadcrumb-item>
                <el-breadcrumb-item >支付</el-breadcrumb-item>
                <el-breadcrumb-item >确认函</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="survery" style="margin-left:20px;">
            <el-form 
                :model="form" 
                ref="form" 
                label-position="top" 
                label-width="auto">
                <el-form-item prop="Q1" label="Business Nature/Personal Focus：（single）" required>
                    <el-radio-group
                        v-model="form.Q1"
                        @change="click">
                        <el-row>
                            <el-col :sm="20" :md="12" v-for="(item,index) in Q1_Option" :key="index"><el-radio  :label="'[Q1-'+(index+1)+']'" >{{item}}</el-radio></el-col>
                        </el-row>
                    </el-radio-group>
                </el-form-item>                
                <el-form-item prop="Q2" label="Please select your main visiting objectives：" required>
                    <el-checkbox-group
                        v-model="form.Q2"
                        :min="0"
                        :max="3">
                        <el-row>
                            <el-col :sm="20" :md="12"><el-checkbox label="[Q2-1]">Talks/Forums</el-checkbox></el-col>
                            <el-col :sm="20" :md="12"><el-checkbox label="[Q2-2]">Design Inspiration</el-checkbox></el-col>
                            <el-col :sm="20" :md="12"><el-checkbox label="[Q2-3]">Networking</el-checkbox></el-col>  
                            <el-col :sm="20" :md="12"><el-checkbox label="[Q2-4]">Exhibit Opportunities</el-checkbox></el-col>
                            <el-col :sm="20" :md="12"><el-checkbox label="[Q2-5]">Sourcing/Purchase</el-checkbox></el-col>
                            <el-col :sm="20" :md="12">
                                <div class="father">
                                    <el-checkbox label="[Q2-6]">New Product Launch</el-checkbox>
                                    <div class="child" v-if="form.Q2.indexOf('[Q2-6]')>=0">
                                        <el-checkbox-group  v-model="form.Q2A">
                                            <el-checkbox label="[Q2-6-1]">Arts/Crafts</el-checkbox>
                                            <el-checkbox label="[Q2-6-2]">Bath</el-checkbox>
                                            <el-checkbox label="[Q2-6-3]">Building Materials</el-checkbox>
                                            <el-checkbox label="[Q2-6-4]">Ceramic Object</el-checkbox>
                                            <el-checkbox label="[Q2-6-5]">Coverings</el-checkbox>
                                        </el-checkbox-group>                                
                                    </div>                             
                                </div>                                
                            </el-col>
                            <el-col :sm="20" :md="12"><el-checkbox label="[Q2-7]">Decorative Items</el-checkbox></el-col>
                            <el-col :sm="20" :md="12"><el-checkbox label="[Q2-8]">Fashion Accessories</el-checkbox>  </el-col>
                        </el-row>                   
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item class="button">
                    <el-button type="primary" @click="submitForm('form')">提交</el-button>
                </el-form-item>
            </el-form>
            </div>
        </el-col>
  </el-row>
</template>

<script>
const Q1_Option= ['Collectors', 'Buyer', 'Artist','KOL (Key Opinion Leaders)','Celebrities','Architecture & Planning','Building Decoration','Real Estate, Property Developer','Real Estate, Property Developer','Property Management','Construction Companies','Contractor','Dealers, Trade Agency, Distributors','Department Store','Retailer','Wholesaler','Hotel, Motel or HomeStay','Private Club','F&B, Restaurants','N/A']

export default {
    data(){
        return{
            form:{
                Q1:'',
                Q2:[],
                Q2A:[]
            },
            Q1_Option:Q1_Option
        }
    },
    methods:{
        click(){
            console.log(this.form.Q1)
        },
        submitForm(formName){
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    
                    this.$axios.post('/response/survery',{
                        mobile:this.$store.state.mobile,
                        ///将选项转换为字符串，切用replace把中间的逗号去掉
                        response:(this.form.Q1+this.form.Q2.toString()+this.form.Q2A.toString()).replace(/,/g,"")
                    }).then(res=>{
                        this.$router.push({path:'/ticket'})
                    })
                }else{
                    console.log('error');
                    return false;
                }
            })
        },

        checkProcess(){//获取步骤代码以判断是否完成上一步操作
            this.$axios.post('/checkProcess',{mobile:this.$store.state.mobile}).then(res=>{
                var response=res.data.result[0].response
                if(response.indexOf('[USER-INFO]')<0){
                    console.log('未成info，回到上一页')
                    this.$router.push({path:'/userInfo'})
                }else if(response.indexOf('[USER-SURV]')>=0){
                    console.log('已完成survery，前往下一页')
                    this.$router.push({path:'/ticket'})
                }
            })
        }
    },
    mounted(){
        this.checkProcess()
    }
}
</script>

<style  scoped>

.el-breadcrumb{
    margin:20px;
}
.checked >>> .el-breadcrumb__inner{
    color:white;
    font-weight: 700;
}
.el-form{
    text-align:left;
}
.el-breadcrumb__inner{
    color:white;
    font-weight: 700;
}
.el-radio,.el-checkbox{
    display:inline-block;
    width:100%;
    margin-bottom:10px;
}
.el-form-item__content {
    line-height:0px;
}
.el-radio__label,
.el-form-item__label,
.el-checkbox__label{
    white-space:pre-wrap;
    color:white;
}
.el-form-item.button{
    text-align:center;
}
.father{
    display:inline-block;
    width:100%;
}
.child{
    margin-left:10px;
}
.el-breadcrumb__item{
    margin-bottom:10px;
}
</style>