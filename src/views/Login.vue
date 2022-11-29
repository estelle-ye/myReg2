<template>
  <div class="main">
    <el-row type="flex" justify="center">
      <el-col :sm="8" :md="6">
        <h2 style="color:white;">观众登录</h2>
        <div class="loginInfo">
          <el-form :model="form" ref="form" :rules="rules">
            <el-form-item prop="name">
              <div class="login">
                <el-input type="text" placeholder="请输入内容" class="loginInfo" v-model="form.name">
                  <template slot="prepend">姓名：</template>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item prop="mobile" >
              <el-input type="tel" placeholder="请输入内容" class="loginInfo" v-model="form.mobile">
                <template slot="prepend">手机：</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="请输入验证码" class="loginInfo" v-model="form.v"></el-input>
              <el-button type="info" style="width:50%" class="loginInfo">获取验证码</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')" v-loading.fullscreen.lock="fullscreenLoading">提交</el-button>
            </el-form-item>            
          </el-form>
        </div>
        <table class="tickets" border="1" cellspacing="0">
          <tr class=“head”>
            <td></td>
            <td>一日票</td>
            <td>二日票</td>
            <td>四日票</td>
          </tr>
          <tr>
            <td>早鸟价</td>
            <td>80元</td>
            <td>140元</td>
            <td>220元</td>
          </tr>
          <tr>
            <td>现场价</td>
            <td>120元</td>
            <td>240元</td>
            <td>360元</td>
          </tr>
        </table>
      </el-col>

    </el-row>

  </div>
</template>

<script>
export default{
  data(){
    var checkMobile=(rules,value,callback)=>{
      var reg=/^1\d{10}$/
      if(value){
        if(reg.test(value)){
          callback()
        }else{
          callback(new Error('请输入正确手机号'))
        }
      }else{
        callback(new Error('必填'))
      }
    } 
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

    return {
      fullscreenLoading:false,
      form: {
        name:'',
        mobile:'',
        v:''
      },
      rules:{
        name:[
          {validator:checkName,trigger:'blur'}
        ],
        mobile:[
          {validator:checkMobile,trigger:'blur'}
        ]
      }
    }
  },
  methods:{

    submitForm(form){
      this.$refs[form].validate((valid)=>{
        if(valid){
          this.login(this.form.name,this.form.mobile)
        }else{
          console.log('err')
          return false
        }
      })
    },

    login(name,mobile){
      this.fullscreenLoading=true
      console.log(this.$store.state)
      this.$axios.post('/add',{
        name,mobile
      })
      .then(res=>{
        this.$store.commit('login',{name:this.form.name,mobile:this.form.mobile})
        if(res.data.code==100){
          this.$axios.post('/checkProcess',{mobile:this.form.mobile}).then(res=>{
            console.log(res.data.result[0].response)
            let response=res.data.result[0].response
            if (!response){
              this.fullscreenLoading=false
              this.$router.push({path:'/userInfo'})
            }else if(response.indexOf("[USER-PAY]")>=0){
              this.fullscreenLoading=false
              this.$router.push({path:'/comfirmation'})
            }else if(response.indexOf("[USER-SURV]")>=0){
              this.fullscreenLoading=false
              this.$router.push({path:'/ticket'})
            }else if(response.indexOf("[USER-INFO]")>=0){
              this.fullscreenLoading=false
              this.$router.push({path:'/survery'})
            }
          })
        }else{
          this.fullscreenLoading=false
          this.$router.push({path:'/userInfo'})
        }
      })
      .catch(err=>{
        console.log(err)
      })
    },
  }
}
</script>

<style scoped>
.main{
  margin:0px 5%;

}
.el-input-group__prepend{
  color: black;
}
.tickets{
  align-items: center;
  width:100%;
  margin-top:50px;
}

.tickets>tr>td{
  font-size:12px;
  padding:6px;
}

.loginInfo{
 margin:6px 0px;
}
</style>