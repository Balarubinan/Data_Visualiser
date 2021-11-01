let myChart=undefined;

function add_option(val,disp){
    let opt=new Option(val,disp)
    let opt_box=document.getElementById('groupField')
    opt_box.add(opt,undefined)
}
function remove_old_fields(){
    document.getElementById('groupField').innerHTML=""
}
function main()
{
    window.alert=e=>console.log(e)
    alert("inside main")
    document.getElementById('datafile')
    .addEventListener('change',handle_chart)
    document.getElementById('groupField')
    .addEventListener('change',handle_chart)
    document.getElementById('chatType')
    .addEventListener('change',handle_chart)
    document.getElementById('saveChart').onclick=save_chart
}
function save_chart(){
    let link = document.createElement("a");
    image_name=document.getElementById('groupField').options[groupField.value].text+document.getElementById('chatType').value
    link.download = image_name+".png";
    document.getElementById('myChart').toBlob(function(blob) {
    link.href = URL.createObjectURL(blob);
    link.click();
    }, `${image_name}/png`);
}
function handle_chart() {
    chtype=chatType.value
    alert("handle chart called")
    var fr=new FileReader();
    fr.readAsText(document.getElementById('datafile').files[0]);
    alert(fr.result)
    let s="",sel_val=groupField.value;
    // remove_old_fields() // optimize this
    // groupField.selected=sel_val
    fr.onload=()=>{
        let n=fr.result
        let x=n.split('\n')
        let xvals=[],yvals=[];
        // assuing that the first line is headers
        let cnt=0;
        let vals=x[1].split(',')
        let headers=x[0].split(',')
        for(let i=0;i<headers.length;i++){
            // adding only float valued fields by checking first data row
            if(String(parseFloat(vals[i])).length==vals[i].length)
            add_option(headers[i],cnt++)
        }
        // ploting 20 values
        for(let i=1;i<20;i++){
            // alert("in loop")
            let s=x[i].split(',')
            xvals.push(s[0])
            yvals.push(parseFloat(s[sel_val=="None"?1:sel_val]))
            // alert(s[0])
            ReDrawChart(xvals,yvals,chtype)
        }
    }
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


function ReDrawChart(xarr,yarr,chtype="bar"){
    alert("redraw chart called")

    // document.getElementById('myChart').innerHTML=""
    myChart?myChart.destroy():0;
    var ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: chtype,
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

/* 
main()

Project name => Data visualizer
1) import data from csv/xlsx/simliar type files
2) select fields to visualize
    1) get number of data points to plot
    2) assume some default grouping
3) enable grouping (selecting columns)
    1) input for field as drop down
    2) check if field is groupable ( ie if grouping has effect)
    3) group field
4) then enable types of charts 
    1) check for compaitabilty of the chart

###BUGS###
1) multiple time option addition => partially fixed
2) Nan values are selected as Float-able fields => fixed

*/