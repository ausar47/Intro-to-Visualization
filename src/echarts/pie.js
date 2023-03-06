(function() {
    var myChart = echarts.init(document.getElementById("pie"));
    option = {
        
        color:['#285943','#77AF9C','#8CD790','#519D9E','#58C9B9','#9DC8C8','#8FBC94', '#D7FFF1','#C5E99B'],
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c}%'
        },

        series: [
            {
                type: 'pie',
                radius: "120%",
                center: '55%',
                roseType: 'radius',
                itemStyle: {
                    borderRadius: 20
                },
                label: {
                    show: false
                },
                emphasis: {
                    label: {
                        show: true
                    }
                },
                
                data: [
                    {value: 7.66, name: 'Asia'},
                    {value: 14.80, name: 'Africa' },
                    {value: 11.63, name: 'Europe' },
                    {value: 8.24, name: 'North America'},
                    {value: 15.315, name: 'Oceania' },
                    {value: 12.01, name: 'South America'},

                ]
            },

        ]
    };

  // 3. 把配置给实例对象
  myChart.setOption(option);
  // 4. 让图表跟随屏幕自动的去适应
  window.addEventListener("resize", function() {
    myChart.resize();}
  );
})();
