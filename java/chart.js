
let totalCaseBar = document.getElementById("totalCaseBar").getContext("2d");
let totalDeathBar = document.getElementById("totalDeathBar").getContext("2d");
let totalNewBar = document.getElementById("totalNewBar").getContext("2d");
let totalRecoBar = document.getElementById("totalRecoBar").getContext("2d");


//function for creating top 10 total case chart
//All chart function use similar code
function chart(){

    //fetching from api
    fetch("https://covid-193.p.rapidapi.com/statistics", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "b1d856148emsh91df552d8017a51p1f927fjsn54a64ed02690",
		"x-rapidapi-host": "covid-193.p.rapidapi.com"
	}
})
.then(responseChart => responseChart.json())
.then(responseChart => {
	
    let statCase = responseChart.response;    
    let statCaseArr = [];
    statCase.sort((a,b)=>{
        return b.cases.total - a.cases.total;
    });
//iterating data from api
    for(let i in statCase){
        
        let country = statCase[i].country;
        //filter out unwanted data
        if(country != "All" && country !="Europe" && country !="Asia" && country !="North-America" && country !="South-America"&& country !="Africa" ){
           
            statCaseArr.push(statCase[i]);
        }       
    }
    statCaseArr.length = 10;
   
//creating chart using chart.js
    let chart = new Chart(totalCaseBar,{
        type: "bar",
        data :{
            labels :[statCaseArr[0].country,statCaseArr[1].country,statCaseArr[2].country,statCaseArr[3].country,statCaseArr[4].country,statCaseArr[5].country,statCaseArr[6].country,statCaseArr[7].country,statCaseArr[8].country,statCaseArr[9].country],
            datasets:[{
                label : "Total Case",
                data:[statCaseArr[0].cases.total,statCaseArr[1].cases.total,statCaseArr[2].cases.total,statCaseArr[3].cases.total,statCaseArr[4].cases.total,statCaseArr[5].cases.total,statCaseArr[6].cases.total,statCaseArr[7].cases.total,statCaseArr[8].cases.total,statCaseArr[9].cases.total],
                backgroundColor : [
                    "#d63230",
                    "#eee1b3",
                    "#56666b",
                    "#1C77C3",
                    "#39A9DB",
                    "#F39237",
                    "#8AE1FC",
                    "#8900FF",
                    "#FFA69E",
                    "#AA4465"
                ]
            }]
        },
        option : {
            
           
        }
    });

   
    
})
.catch(err => {
	console.error(err);
});
}
chart();


//function for creating top 10 total death chart
function deathChart(){
    fetch("https://covid-193.p.rapidapi.com/statistics", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "b1d856148emsh91df552d8017a51p1f927fjsn54a64ed02690",
		"x-rapidapi-host": "covid-193.p.rapidapi.com"
	}
})
.then(responseDeath => responseDeath.json())
.then(responseDeath => {
    let statDeath = responseDeath.response;
    
    let statDeathArr = [];
       statDeath.sort((a,b)=>{
        return b.deaths.total - a.deaths.total;
    });
    for(let i in statDeath){
        let countryD = statDeath[i].country;
        if(countryD != "All" && countryD !="Europe" && countryD !="Asia" && countryD !="North-America" && countryD !="South-America"&& countryD !="Africa" ){
            statDeathArr.push(statDeath[i]);
        }
    }
   
    statDeathArr.length = 10;
    let chartDeath = new Chart(totalDeathBar,{
        type: "bar",
        data :{
            labels :[statDeathArr[0].country,statDeathArr[1].country,statDeathArr[2].country,statDeathArr[3].country,statDeathArr[4].country,statDeathArr[5].country,statDeathArr[6].country,statDeathArr[7].country,statDeathArr[8].country,statDeathArr[9].country],
            datasets:[{
                
                label : "Total Death",
                data:[statDeathArr[0].deaths.total,statDeathArr[1].deaths.total,statDeathArr[2].deaths.total,statDeathArr[3].deaths.total,statDeathArr[4].deaths.total,statDeathArr[5].deaths.total,statDeathArr[6].deaths.total,statDeathArr[7].deaths.total,statDeathArr[8].deaths.total,statDeathArr[9].deaths.total],
        
                backgroundColor : [
                    "#d63230",
                    "#eee1b3",
                    "#56666b",
                    "#1C77C3",
                    "#39A9DB",
                    "#F39237",
                    "#8AE1FC",
                    "#8900FF",
                    "#FFA69E",
                    "#AA4465"
                ],
                
            }]
        },
        option : {
            
        }
    });
})
.catch(err => {
	console.error(err);
});
}
deathChart();

//function for creating top 10 new case chart
function newCaseChart(){
    fetch("https://covid-193.p.rapidapi.com/statistics", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "b1d856148emsh91df552d8017a51p1f927fjsn54a64ed02690",
		"x-rapidapi-host": "covid-193.p.rapidapi.com"
	}
})
.then(responseNew => responseNew.json())
.then(responseNew => {
	let statNew = responseNew.response
    let statNewArr = [];
    
    statNew.sort((a,b)=>{
        return b.cases.new - a.cases.new;
    });

    for(let i in statNew){
        let countryN = statNew[i].country;
        if(countryN != "All" && countryN !="Europe" && countryN !="Asia" && countryN !="North-America" && countryN !="South-America"&& countryN !="Africa" ){
            statNewArr.push(statNew[i]);
        }
    }
   
    statNewArr.length = 10;
    let chartNew = new Chart(totalNewBar,{
        type: "bar",
        data :{
            labels :[statNewArr[0].country,statNewArr[1].country,statNewArr[2].country,statNewArr[3].country,statNewArr[4].country,statNewArr[5].country,statNewArr[6].country,statNewArr[7].country,statNewArr[8].country,statNewArr[9].country],
            datasets:[{
                
                label : "Total New Case",
                data:[statNewArr[0].cases.new,statNewArr[1].cases.new,statNewArr[2].cases.new,statNewArr[3].cases.new,statNewArr[4].cases.new,statNewArr[5].cases.new,statNewArr[6].cases.new,statNewArr[7].cases.new,statNewArr[8].cases.new,statNewArr[9].cases.new],
                backgroundColor : [
                    "#d63230",
                    "#eee1b3",
                    "#56666b",
                    "#1C77C3",
                    "#39A9DB",
                    "#F39237",
                    "#8AE1FC",
                    "#8900FF",
                    "#FFA69E",
                    "#AA4465"
                ],
                
            }]
        },
        option : {}
    });
})
.catch(err => {
	console.error(err);
});
}

newCaseChart();


//function for creating top 10 recover case chart
function recoverCaseChart(){
    fetch("https://covid-193.p.rapidapi.com/statistics", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "b1d856148emsh91df552d8017a51p1f927fjsn54a64ed02690",
		"x-rapidapi-host": "covid-193.p.rapidapi.com"
	}
})
.then(responseReco => responseReco.json())
.then(responseReco => {
	let statReco = responseReco.response
    let statRecoArr = [];
    
    statReco.sort((a,b)=>{
        return b.cases.recovered - a.cases.recovered;
    });

    for(let i in statReco){
        let countryR = statReco[i].country;
        if(countryR != "All" && countryR !="Europe" && countryR !="Asia" && countryR !="North-America" && countryR !="South-America"&& countryR !="Africa" ){
            statRecoArr.push(statReco[i]);
        }
    }
   
    statRecoArr.length = 10;
    let chartReco = new Chart(totalRecoBar,{
        type: "bar",
        data :{
            labels :[statRecoArr[0].country,statRecoArr[1].country,statRecoArr[2].country,statRecoArr[3].country,statRecoArr[4].country,statRecoArr[5].country,statRecoArr[6].country,statRecoArr[7].country,statRecoArr[8].country,statRecoArr[9].country],
            datasets:[{
                
                label : "Total Recovered Case",
                data:[statRecoArr[0].cases.recovered,statRecoArr[1].cases.recovered,statRecoArr[2].cases.recovered,statRecoArr[3].cases.recovered,statRecoArr[4].cases.recovered,statRecoArr[5].cases.recovered,statRecoArr[6].cases.recovered,statRecoArr[7].cases.recovered,statRecoArr[8].cases.recovered,statRecoArr[9].cases.recovered],
                backgroundColor : [
                    "#d63230",
                    "#eee1b3",
                    "#56666b",
                    "#1C77C3",
                    "#39A9DB",
                    "#F39237",
                    "#8AE1FC",
                    "#8900FF",
                    "#FFA69E",
                    "#AA4465"
                ],
                
            }]
        },
        option : {}
    });
})
.catch(err => {
	console.error(err);
});
}
recoverCaseChart();