<template>
  <div v-if="$store.state.mobile">
    <el-row type="flex" justify="center" style="width:100%;">
        <el-col :sm="20" :md="12">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item class="checked">个人信息</el-breadcrumb-item>
                <el-breadcrumb-item >问卷</el-breadcrumb-item>
                <el-breadcrumb-item >购票</el-breadcrumb-item>
                <el-breadcrumb-item >支付</el-breadcrumb-item>
                <el-breadcrumb-item >确认函</el-breadcrumb-item>
            </el-breadcrumb>
            <el-form :model="form" ref="form" :rules="rules" label-width="80px" label-position="right" style="width:90%">
                <el-form-item label="称谓" prop="gender" class="gender">
                    <el-radio-group v-model="form.gender">
                        <el-radio label="men">先生</el-radio>
                        <el-radio label="women">女士</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input type="text" v-model="form.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model.number="form.mobile" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="公司" prop="company">
                    <el-input v-model="form.company"></el-input>
                </el-form-item>    
                <el-form-item class="address" prop="address">
                    <!-- Address组件 -->
                    <AddressSelect v-on:putData1="getData1" v-on:putData2="getData2"></AddressSelect>
                </el-form-item>                            
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')" >提交</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import AddressSelect from '@/components/Address.vue'//Address组件
export default {
    data() {
        var checkName=(rules,value,callback)=>{
            var reg=/^[\u4e00-\u9fa5A-Za-z]{2,20}$/
            if(value){
                if(!reg.test(value)){
                    callback(new Error('长度在2-20之间的字母或汉字'))
                }else{
                    callback()
                }
            }else{
                callback(new Error('必填'))
            }
        }

        var checkEmail=(rules,value,callback)=>{
            var reg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            if(value){
                if(reg.test(value)){
                    callback()
                }else{
                    callback(new Error('请输入正确邮箱'))
                }
            }else{
                callback(new Error('必填'))
            }
        }

        var checkAddress=(rules,value,callback)=>{
            if(this.form.country=='China'){
                if(this.form.province){
                    callback()
                }else{
                    callback(new Error('必填'))
                }
            }else if(!this.form.country){
                callback(new Error('必填'))
            }else{
                callback()
            }
        }//Address组件
        return {
            fullscreenLoading:false,
            form: {
                gender:'',
                name: this.$store.state.name,
                mobile:this.$store.state.mobile,
                email:'',
                company:'',
                country:'',//Address组件
                province:[],//Address组件
            },
            rules:{
                gender:[
                    {required:true,message:'必填',trigger:'blur'}
                ],                
                name:[
                    {required:true,validator: checkName,trigger:'blur'}
                ],
                email:[
                    {required:true,validator:checkEmail,trigger:'blur'}
                ],
                company:[
                    {required:true,message:'必填',trigger:'blur'}
                ],
                address:[//Address组件 
                    {validator:checkAddress,message:'必填',trigger:'blur'}
                ]           
            }
        }
    },
   methods: {
        getData1(data){//Address组件
            this.form.country=data;
        },
        getData2(data){//Address组件
            this.form.province=data
        },
        submitForm(formName){
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    this.$axios.post('/update',{
                        province:this.form.province.toString(),
                        country:this.form.country.toString(),
                        company:this.form.company,
                        email:this.form.email,
                        title:this.form.gender,
                        mobile:this.form.mobile
                    }).then(res=>{
                        console.log(res);
                        this.$router.push({path:'/survery'})
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
                if(response!=null){//indexOf函数用在空字符上会报错，所以这里直接判断是否为空字符
                    console.log('已完成info，前往下一页')
                    this.$router.push({path:'/survery'})

                }
            })
        }         
    },
    mounted(){
        this.checkProcess()
    },

    components:{//Address组件
        AddressSelect
    },
}
</script>

<style scoped>
.el-form-item.gender{
    text-align:left;
}
.AddressSelect{
    margin-left:-40px;
    color:#606266;
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