let myChart=undefined;

function main()
{
    window.alert=e=>console.log(e)
    alert("inside main")
    document.getElementById('datafile')
    .addEventListener('change', function() {
      
    var fr=new FileReader();
    alert(this.files)
    fr.readAsText(this.files[0]);
    alert(fr.result)
    let s="";
    fr.onload=()=>{
       let n=fr.result
       let x=n.split('\n')
       let xvals=[],yvals=[];
       for(let i=1;i<20;i++){
           alert("in loop")
           let s=x[i].split(',')
           xvals.push(parseFloat(s[0]))
           yvals.push(parseFloat(s[1]))
        //    alert(s[0]+"**"+s[1])
           ReDrawChart(xvals,yvals)
       }
       alert(x)
    }
})
}

function generateRandomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function RGBCreator(){
    let st="rgba("
    st+=([255,255,255,0.1].map(i=>generateRandomInteger(i)).join(','))
    st+=')'
    return st
}

// creating an array of 100 random colors
let bck=[];
for(let i=0;i<100;i++)
bck.push(RGBCreator())


function ReDrawChart(xarr,yarr){
    alert("redraw chart called")
    // document.getElementById('myChart').innerHTML=""
    myChart?myChart.destroy():0;
    var ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xarr,
            datasets: [{
                data: yarr,
                backgroundColor:bck
            }]  
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// main()
// Project name => Data visualizer
// 1) import data from csv/xlsx/simliar type files
// 2) select fields to visualize
// 3) enable grouping (selecting columns)
// 4) then enable types of charts