<template>
  <div class="home">
    <div class="leftBox">
      <div class="top">
        <div class="leftContent">
          <div class="one">
            <h4 class="tip">支付宝方式占比</h4>
            <div id="pieChart"></div>
            <borderView width='30px' height='28px' length='3px' />
          </div>
          <div class="two">
            <div class="level">
              <p>今日交易额:</p>
              <p><span style="color:#8dc149">{{ dayTotalNumber }} </span>元</p>
            </div>
            <div class="level">
              <p>今日交易量:</p>
              <p><span style="color:#8dc149">{{ dayTatalSum }} </span>笔</p>
            </div>
            <div class="level">
              <p>今年累计交易额:</p>
              <p><span style="color:#8dc149">{{ yearTotalNumber }} </span>元</p>
            </div>
            <div class="level">
              <p>今年累计交易量:</p>
              <p><span style="color:#8dc149">{{ yearTatalSum }} </span>笔</p>
            </div>
            <div class="level">
              <p>今年累计交易用户:</p>
              <p>---- 个</p>
            </div>
            <borderView width='30px' height='28px' length='3px' />
          </div>
        </div>
        <div class="rightContent">
          <h2>汇银通综合支付系统交易数据看板</h2>
          <div class="tip">数据最近一次更新于 : {{ updateTime }}</div>

          <div class="centerContent">
            <h4 class="tip">支付方式近三十天交易金额</h4>
            <div id="leftCenterBarChart"></div>
            <borderView :show="false" width='30px' height='28px' length='3px' />
          </div>
          <!-- <borderView width='30px' height='28px' length='3px'/> -->
        </div>

      </div>
      <div class="bottomContent">
        <h4 class="tip">近十五天毎日交易額</h4>
        <div id="bottomBarChart"></div>
        <borderView width='30px' height='28px' length='3px' />
      </div>
    </div>
    <div class="rightBox">
      <div class="rightContent">
        <h3>暂无城市交易数据</h3>
        <borderView width='30px' height='28px' length='3px' />
      </div>
      <div class="rightContent">
        <h4 class="tip">近七个月每月交易情况</h4>
        <div id="rightCenterBarChart"></div>
        <borderView width='30px' height='28px' length='3px' />
      </div>
      <div class="rightContent">
        <h4 class="tip">近七天交易量</h4>
        <div id="rightBottomBarChart"></div>
        <borderView width='30px' height='28px' length='3px' />
      </div>
    </div>
  </div>
</template>

<script>
import borderView from '@/components/borderView';
export default {
  name: 'HomeView',
  components: {
    borderView
  },
  data () {
    return {
      pieChart: '',
      bottomBarChart: '',
      rightCenterBarChart: '',
      rightBottomBarChart: '',
      leftCenterBarChart: '',

      //图表数据
      pieChartoptionData: '',
      pieCharseriesData: '',

      //今日交易总数
      dayTatalSum: '',
      dayTotalNumber: '',
      yearTatalSum: '',
      yearTotalNumber: '',

      //近三十天交易金额
      leftCenterOptionData: '',
      leftCenterseriesData: '',

      //近十五天的交易额
      bottomOptionData: '',
      bottomSeriesData: '',

      //近七个月的笔数
      rightCenterOptionData: '',
      rightCenterSeriesData: '',

      //近七天交易的笔数
      rightBottomOptionDate: '',
      rightBottomSeriesDate: '',

      time: '',
      updateTime: ''

    }
  },
  created () {
    // alert(process.env.NODE_ENV );
    this.updateTime = this.getBeforeDate(0, '-', true)
  },
  mounted () {
    this.getfullScreen()

    this.getLeftPieChart()
    this.getBottomBarChart()
    this.getRightCenterBarChart()
    this.getRightBottomBarChart()
    this.getLeftCenterBarChart()
    //今日交易总数
    this.getTransactionTotal()
  },
  methods: {
    //全屏展示
    getfullScreen () {
      const fullScreenBtn = document.querySelector('.home')
      fullScreenBtn.onclick = () => {
        fullScreenBtn.requestFullscreen()
          .then(() => {
            console.log('进入全屏成功')

            this.getLeftPieChart()
            this.getBottomBarChart()
            this.getRightCenterBarChart()
            this.getRightBottomBarChart()
            this.getLeftCenterBarChart()

            //今日交易总数
            this.getTransactionTotal()

            this.updateTime = this.getBeforeDate(0, '-', true)


            //设置定时
            this.time = setInterval(() => {
              this.getLeftPieChart()
              this.getBottomBarChart()
              this.getRightCenterBarChart()
              this.getRightBottomBarChart()
              this.getLeftCenterBarChart()

              this.updateTime = this.getBeforeDate(0, '-', true)
            }, 600000)


          })
          .catch(() => {
            console.log('进入全屏失败')
          })
      }

      let _this = this
      //监视全屏的变化
      document.addEventListener("fullscreenchange", function (e) {
        if (document.fullscreenElement) {
          console.log('监听进入全屏')
        } else {
          console.log('监听退出全屏')

          // _this.updateTime = _this.getBeforeDate(0, '-', true)

          clearInterval(this.time)//清除定时器
          _this.time = null

          _this.$router.go(0)//重新渲染页面,触发create函数,不需要更新updateTime
        }
      })

    },
    //交易总数据
    async getTransactionTotal () {
      let data = {
        transCode: 'TRANSACTIONTOTAL'
      }
      let ret = await this.$api.sendMs(data)
      console.log('今日交易数据:', ret);
      this.dayTatalSum = ret.dayTatalSum
      this.dayTotalNumber = ret.dayTotalNumber
      this.yearTatalSum = ret.yearTatalSum
      this.yearTotalNumber = ret.yearTotalNumber
    },
    async getLeftPieChart () {
      let data = { transCode: 'MERCHTYPEDATA' }
      let ret = await this.$api.sendMs(data)
      console.log(ret);
      this.pieChartoptionData = ret.map(item => {
        return {
          name: item.name,
          textStyle: { color: '#fff' }
        }
      })
      console.log('pieChartoptionData', this.pieChartoptionData);
      this.pieCharseriesData = ret.map(item => {
        return {
          value: item['1'].num,
          name: item.name,
          itemStyle: item.itemStyle
        }
      })
      console.log('pieCharseriesData', this.pieCharseriesData);

      if (this.pieChart != '' && this.pieChart != '' && this.pieChart != undefined) {
        this.pieChart.dispose()//销毁
      }

      this.pieChart = this.$echarts.init(
        document.querySelector("#pieChart")
      );
      let
        option = {

          tooltip: {
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            bottom: 40,
            left: 'center',
            data: this.pieChartoptionData,

            //字体颜色
            // data: [
            //   { name: '支付宝', textStyle: { color: '#fff' } },
            //   { name: '微信', textStyle: { color: '#fff' } },
            //   { name: '银联', textStyle: { color: '#fff' } },
            //   { name: '微信代扣', textStyle: { color: '#fff' } },
            //   { name: '一码付', textStyle: { color: '#fff' } },
            //   { name: '支付宝代扣', textStyle: { color: '#fff' } },
            //   { name: '其他', textStyle: { color: '#fff' } }
            // ],
          },
          series: [
            {
              type: 'pie',
              radius: '50%',
              center: ['49%', '34%'],
              selectedMode: 'single',
              data: this.pieCharseriesData,
              // data: [
              //   { value: 735, name: '支付宝' },
              //   { value: 510, name: '微信' },
              //   { value: 735, name: '银联' },
              //   { value: 510, name: '微信代扣' },
              //   { value: 434, name: '一码付' },
              //   { value: 735, name: '支付宝代扣', },
              //   { value: 510, name: '其他', itemStyle: { color: "" } }//自定义颜色
              // ],
              itemStyle: {

                normal: {
                  label: {
                    color: '#fff',
                    show: true,
                    position: 'outer',
                    fontSize: 12,
                    fontWeight: 'bold',
                    align: "left",
                    formatter: function (p) { //指示线对应文字,百分比
                      return p.percent + "%";//设置百分比保留几位小数
                    }
                  },
                  labelLine: { //指示线状态
                    show: true,
                    smooth: 0.2,
                    length: 10,
                    length2: 20,
                    lineStyle: {
                      //线条颜色
                      color: '#fff'
                    }
                  }
                }
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
      this.pieChart.setOption(option)
    },
    async getBottomBarChart () {
      let timeArr = []
      let format = {}

      for (let i = 0; i < 15; i++) {
        // format = { startDate: this.getBeforeDate(i + 1, '-'), endDate: this.getBeforeDate(i+1, '-') }
        format = { startDate: this.getBeforeDate(i + 31, '-'), endDate: this.getBeforeDate(i + 31, '-') }
        timeArr.push(format)
      }
      console.log(timeArr);
      let data = {
        transCode: 'TRANSACTIONTIMEFIFTEEN',
        timeArr,
        name: '天'
      }
      let ret = await this.$api.sendMs(data)
      console.log('近十五的交易额', ret);
      this.bottomOptionData = ret.map((item, index) => {
        return `前${index + 1}天`
      })
      this.bottomSeriesData = ret.map(item => {
        return item.numberSum.toFixed(2)
      })

      if (this.bottomBarChart != '' && this.bottomBarChart != '' && this.bottomBarChart != undefined) {
        this.bottomBarChart.dispose()//销毁
      }

      this.bottomBarChart = this.$echarts.init(
        document.querySelector("#bottomBarChart")
      );

      let option = {
        //顶部设置单位
        //   title: {
        //   // title为标题部分，有一级标题text，二级标题subtext。这里我们使用二级标题，再修改一下这个二级标题的位置即可出现我们想要的效果了，当然样式也可以通过title.subtextStyle去配置
        //   subtext: "单位（万元）",
        //   left: 24,// 距离左边位置
        //   top: 16,// 距离上面位置
        //   subtextStyle:{ // 设置二级标题的样式
        //     color:"#baf"
        //   }
        // },

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          // formatter: '前 {b} 天 </br>  {a} {c}'
          formatter: ' {b}  </br>  {a} {c}'
        },
        xAxis: {
          type: 'category',
          data: this.bottomOptionData,
          // data: [17, 16, 15, 14, 13, 12, 11],
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#fff', //左边线的颜色
              width: '1' //x坐标线的宽度
            }
          },
          // axisLabel: {//格式化值
          //   formatter: "前 {value} 天",
          //   textStyle: {
          //     color: '#fff', //x坐标值文本的颜色
          //   },

          // }

        },
        yAxis: {
          type: 'value',
          axisLabel: {
            //这种做法就是在y轴的数据的值旁边拼接单位
            formatter: "{value} 元",
          },
          textStyle: {
            color: '#fff', //y坐标文本的颜色
          },
          axisLine: {//y轴线的配置
            show: true,//是否展示
            lineStyle: {
              color: "#fff",//y轴线的颜色（若只设置了y轴线的颜色，未设置y轴文字的颜色，则y轴文字会默认跟设置的y轴线颜色一致）
              width: 1,//y轴线的宽度
              type: "solid"//y轴线为实线
            }
          },
          splitLine: {//y轴分割线配置
            show: true,
            lineStyle: {
              type: 'dashed',
              color: "#fff",
            }
          }
        },
        series: [
          {
            name: '近十五的交易额（元）',
            data: this.bottomSeriesData,
            // data: [24000000, 24000000, 24000000, 24000000, 24000000, 24000000, 24000000],
            barWidth: '60%',
            type: 'bar',
            itemStyle: {
              normal: {
                //柱体颜色
                color: '#3abffa',
                label: {
                  show: true, //开启显示
                  formatter (params) {
                    return params.data.value
                  },
                  position: 'top', //在上方显示
                  textStyle: { //数值样式
                    color: '#8dc149',
                    // color: '#fff',
                    fontSize: 12
                  }
                }
              }
            },

          }
        ],
        grid: {
          left: '1%',
          top: '9%',
          right: '1%',
          bottom: '10%',
          containLabel: true,
        },
        legend: {
          textStyle: {
            color: '#fff'
          },
          show: true,
          bottom: 4,
          left: 100,

        },
      };

      this.bottomBarChart.setOption(option)
    },
    async getRightCenterBarChart () {
      let timeArr = []
      let format = {}
      for (let i = 0; i < 7; i++) {
        format = { startDate: this.getBeforeDate((i + 1) * 30, '-'), endDate: this.getBeforeDate(i * 30, '-') }
        timeArr.push(format)
      }
      console.log('7个月-------', timeArr);
      let data = {
        transCode: 'TRANSACTIONTIMESEVENMONTH',
        timeArr,
        name: '月'
      }
      let ret = await this.$api.sendMs(data)
      console.log('近七个月的交易笔数', ret);
      this.rightCenterOptionData = ret.map(item => {
        return item.name
      })
      this.rightCenterSeriesData = ret.map(item => {
        return item.total
      })

      if (this.rightCenterBarChart != '' && this.rightCenterBarChart != '' && this.rightCenterBarChart != undefined) {
        this.rightCenterBarChart.dispose()//销毁
      }
      this.rightCenterBarChart = this.$echarts.init(
        document.querySelector("#rightCenterBarChart")
      );
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          // formatter: '前 {b} 月 </br>  {a} {c}'
          formatter: ' {b}  </br>  {a} {c}'
        },
        xAxis: {
          type: 'category',
          data: this.rightCenterOptionData,
          // data: [17, 16, 15, 14, 13, 12, 11],
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#fff', //左边线的颜色
              width: '1' //x坐标线的宽度
            }
          },
          axisLabel: {
            // formatter: "前 {value} 月",
            textStyle: {
              color: '#fff', //x坐标值文本的颜色
            },
          }

        },
        yAxis: {
          type: 'value',
          axisLabel: {
            //这种做法就是在y轴的数据的值旁边拼接单位
            formatter: "{value} 笔",
          },
          textStyle: {
            color: '#fff', //y坐标文本的颜色
          },
          axisLine: {//y轴线的配置
            show: true,//是否展示
            lineStyle: {
              color: "#fff",//y轴线的颜色（若只设置了y轴线的颜色，未设置y轴文字的颜色，则y轴文字会默认跟设置的y轴线颜色一致）
              width: 1,//y轴线的宽度
              type: "solid"//y轴线为实线
            }
          },
          splitLine: {//y轴分割线配置
            show: true,
            lineStyle: {
              type: 'dashed',
              color: "#fff",
            }
          }
        },
        series: [
          {
            name: '当月交易量（笔）',
            data: this.rightCenterSeriesData,
            // data: [15000000, 17000000, 20000000, 21000000, 22000000, 23000000, 24000000],
            barWidth: '60%',
            type: 'bar',
            itemStyle: {
              normal: {
                //柱体颜色
                color: '#3abffa',
                label: {
                  show: true, //开启显示
                  formatter (params) {
                    return params.data.value
                  },
                  position: 'top', //在上方显示
                  textStyle: { //数值样式
                    color: '#8dc149',
                    // color: '#fff',
                    fontSize: 12
                  }
                }
              }
            },

          }
        ],
        grid: {
          left: '1%',
          top: '7%',
          right: '3%',
          bottom: '10%',
          containLabel: true,
        },
        legend: {
          textStyle: {
            color: '#fff'
          },
          show: true,
          bottom: 4,
          left: 100,

        },
      };

      this.rightCenterBarChart.setOption(option)
    },
    async getRightBottomBarChart () {
      let timeArr = []
      let format = {}
      for (let i = 0; i < 7; i++) {
        // format = { startDate: this.getBeforeDate(i + 1, '-'), endDate: this.getBeforeDate(i+1, '-') }
        format = { startDate: this.getBeforeDate(i + 31, '-'), endDate: this.getBeforeDate(i + 31, '-') }
        timeArr.push(format)
      }
      console.log(timeArr);
      let data = {
        transCode: 'TRANSACTIONTIMESEVENDAY',
        timeArr,
        name: '天'
      }
      let ret = await this.$api.sendMs(data)
      this.rightBottomOptionDate = ret.map(item => {
        return item.name
      })
      this.rightBottomSeriesDate = ret.map(item => {
        return item.total
      })
      console.log('近七天交易量', ret);

      if (this.rightBottomBarChart != '' && this.rightBottomBarChart != '' && this.rightBottomBarChart != undefined) {
        this.rightBottomBarChart.dispose()//销毁
      }
      this.rightBottomBarChart = this.$echarts.init(
        document.querySelector("#rightBottomBarChart")
      );
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          // formatter: '前 {b} 天 </br>  {a} {c}'
          formatter: '{b} </br>  {a} {c}'
        },
        xAxis: {
          type: 'category',
          data: this.rightBottomOptionDate,
          // data: [17, 16, 15, 14, 13, 12, 11],
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#fff', //左边线的颜色
              width: '1' //x坐标线的宽度
            }
          },
          axisLabel: {
            // formatter: "前 {value} 天",
            textStyle: {
              color: '#fff', //x坐标值文本的颜色
            },

          }

        },
        yAxis: {
          type: 'value',
          axisLabel: {
            //这种做法就是在y轴的数据的值旁边拼接单位
            formatter: "{value} 笔",
          },
          textStyle: {
            color: '#fff', //y坐标文本的颜色
          },
          axisLine: {//y轴线的配置
            show: true,//是否展示
            lineStyle: {
              color: "#fff",//y轴线的颜色（若只设置了y轴线的颜色，未设置y轴文字的颜色，则y轴文字会默认跟设置的y轴线颜色一致）
              width: 1,//y轴线的宽度
              type: "solid"//y轴线为实线
            }
          },
          splitLine: {//y轴分割线配置
            show: true,
            lineStyle: {
              type: 'dashed',
              color: "#fff",
            }
          }
        },
        series: [
          {
            name: '当日交易量（笔）',
            data: this.rightBottomSeriesDate,
            // data: [15000000, 17000000, 20000000, 21000000, 22000000, 23000000, 24000000],
            barWidth: '60%',
            type: 'bar',
            itemStyle: {
              normal: {
                //柱体颜色
                color: '#3abffa',
                label: {
                  show: true, //开启显示
                  formatter (params) {
                    return params.data.value
                  },
                  position: 'top', //在上方显示
                  textStyle: { //数值样式
                    color: '#8dc149',
                    // color: '#fff',
                    fontSize: 12
                  }
                }
              }
            },

          }
        ],
        grid: {
          left: '1%',
          top: '7%',
          right: '3%',
          bottom: '10%',
          containLabel: true,
        },
        legend: {
          textStyle: {
            color: '#fff'
          },
          show: true,
          bottom: 4,
          left: 100,

        },
      };

      this.rightBottomBarChart.setOption(option)
    },
    async getLeftCenterBarChart () {
      let data = {
        transCode: 'TRANSACTIONTHIRTY',
        startDate: this.getBeforeDate(30, '-'),
        endDate: this.getBeforeDate(0, '-')
      }

      let ret = await this.$api.sendMs(data)
      console.log('交易数据近三十天:', ret);

      this.leftCenterOptionData = ret.map(item => {
        return item.name
      })

      this.leftCenterSeriesData = ret.map(item => {
        return item.numberSum
      })

      if (this.leftCenterBarChart != '' && this.leftCenterBarChart != '' && this.leftCenterBarChart != undefined) {
        this.leftCenterBarChart.dispose()//销毁
      }
      this.leftCenterBarChart = this.$echarts.init(
        document.querySelector("#leftCenterBarChart")
      );

      let option = {

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{b} </br>  {a} (元) {c} '
        },
        legend: {
          textStyle: {
            color: '#fff'
          },
          show: true,
          bottom: 4,
          right: 30,
        },
        grid: {
          top: '3%',
          left: '2%',
          right: '8%',
          bottom: '7%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          position: 'top',
          axisLabel: {
            //这种做法就是在y轴的数据的值旁边拼接单位
            formatter: "{value} 元",
          },
          splitLine: {//y轴分割线配置
            show: true,
            lineStyle: {
              type: 'dashed',
              color: "#fff",
            }
          },
          axisLine: {//x轴线的配置
            show: true,//是否展示
            lineStyle: {
              color: "#fff",//x轴线的颜色（若只设置了x轴线的颜色，未设置x轴文字的颜色，则y轴文字会默认跟设置的y轴线颜色一致）
              width: 1,//x轴线的宽度
              type: "solid"//x轴线为实线
            }
          },
        },
        yAxis: {
          type: 'category',
          data: this.leftCenterOptionData,
          // data: ['刷卡消费', '支付宝代扣', '校园码', '微信实体卡', '银联', '支付宝', '微信'],
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#fff', //左边线的颜色
              width: '1' //x坐标线的宽度
            }
          },
        },
        series: [
          {
            barWidth: '70%',
            name: '近30天交易量',
            type: 'bar',
            data: this.leftCenterSeriesData,
            // data: [19325, 23438, 31000, 121594, 134141, 681807, 111111],
            itemStyle: {
              normal: {
                //柱体颜色
                color: '#c72727',
                label: {
                  show: true, //开启显示
                  formatter (params) {
                    return params.data.value
                  },
                  position: 'right', //在上方显示
                  textStyle: { //数值样式
                    color: '#8dc149',
                    // color: '#fff',
                    fontSize: 12
                  }
                }
              }
            }
          }
        ]
      }
      this.leftCenterBarChart.setOption(option)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: flex;
  height: calc(100% - 40px);
  padding: 20px 20px;
  overflow: hidden;
  //   background-color: cadetblue;
  background: url('../assets/star.png') no-repeat;
  background-size: 100% 100%;

  .leftBox {
    flex: 3;
    // background: red;
    display: flex;
    flex-direction: column;

    .top {
      flex: 1;
      display: flex;

      .leftContent {
        // background-color: blueviolet;
        flex: 1.3;
        display: flex;
        flex-direction: column;
        color: #fff;

        .one {
          width: 100%;
          height: 310px;
          position: relative;
          margin-bottom: 5px;

          #pieChart {
            width: 100%;
            height: 100%;
            margin: 0 auto;
          }

          .tip {
            margin: 10px 0 0 10px;
            color: #fff;
          }
        }

        .two {
          flex: 1;
          padding: 10px;
          position: relative;
          margin-bottom: 5px;

          .level {
            display: flex;
            justify-content: space-between;
            padding-bottom: 15px;
          }
        }
      }

      .rightContent {
        flex: 2.7;
        // background: pink;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-content: center;
        margin: 0 5px 10px 10px;
        margin-bottom: 5px;

        h2 {
          color: #fff;
        }

        .tip {
          margin-top: 5px;
          color: rgba($color: #fff, $alpha: 0.5);
          padding-bottom: 5px;
        }

        .centerContent {
          // background-color: #d0c689;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;

          .tip {
            margin-top: 5px;
            color: #fff;
          }

          #leftCenterBarChart {
            flex: 1;
          }
        }
      }
    }

    .bottomContent {
      flex: 1;
      // background-color: brown;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;

      .tip {
        text-align: center;
        padding-top: 5px;
        color: #fff;
      }

      #bottomBarChart {
        flex: 1;
      }
    }
  }

  .rightBox {
    flex: 1.3;
    // background: yellow;
    display: flex;
    flex-direction: column;
    margin-left: 5px;

    .rightContent {
      flex: 1;
      margin-bottom: 5px;

      &:nth-child(1) {
        // background-color: blueviolet;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        h3 {
          color: #d0c689;
        }
      }

      &:nth-child(2) {
        position: relative;
        // background-color:chocolate;

        .tip {
          text-align: center;
          margin-top: 5px;
          color: #fff;
        }

        #rightCenterBarChart {
          height: 100%;
          width: 100%;
        }
      }

      &:nth-child(3) {
        position: relative;
        margin-bottom: 0;

        .tip {
          text-align: center;
          margin-top: 5px;
          color: #fff;
        }

        // background-color:cadetblue;

        #rightBottomBarChart {
          height: 100%;
          width: 100%;
        }
      }
    }
  }
}
</style>
