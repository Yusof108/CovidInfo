//global variables
let index = 0;
let isData = true; //to check if data available or not
let countryAPI = new Array();

//create event listener tll all countries
var countries = document.querySelectorAll('path');
countries.forEach(countries => countries.addEventListener('click', country));

//MAP PATH FUNCTION
//Map Color and Continents Stats Function
function mapColor() {
	var format = new Intl.NumberFormat();
	fetch("https://covid-193.p.rapidapi.com/statistics", {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "490f3f1eacmsha9f808019c36460p132d4bjsneaf41f4d1b47",
			"x-rapidapi-host": "covid-193.p.rapidapi.com"
		}
	})
		.then(response => response.json())
		.then(response => {
			let getResult = response.response;
			//map color scripts
			for (let data in getResult) {
				
				let population = getResult[data].population;
				let confirmCase = getResult[data].cases.total;
				let activeCase = format.format(getResult[data].cases.new);
				let ratio = population / confirmCase;
				let result = ((parseInt(activeCase) * 28) / population) * 100000;

				if (Math.round(ratio) > 0 && Math.round(ratio) <= 20) {
					let thisCountry = getResult[data].country;
					var i = countryName.map(x => x.name).indexOf(thisCountry);
					if (i !== -1) {
						let element = document.getElementById(countryName[i].code);
						if (element !== null) {
							element.style.fill = '#8B0000';
						}
					}
				}
				if (Math.round(ratio) > 20 && Math.round(ratio) <= 60) {
					let thisCountry = getResult[data].country;
					var i = countryName.map(x => x.name).indexOf(thisCountry);
					if (i !== -1) {
						let element = document.getElementById(countryName[i].code);
						if (element !== null) {
							element.style.fill = '#B22222';
						}
					}
				}
				if (Math.round(ratio) > 60 && Math.round(ratio) <= 120) {
					let thisCountry = getResult[data].country;
					var i = countryName.map(x => x.name).indexOf(thisCountry);
					if (i !== -1) {
						let element = document.getElementById(countryName[i].code);
						if (element !== null) {
							element.style.fill = '#CD5C5C';
						}
					}
				}
				if (Math.round(ratio) > 120 && Math.round(ratio) <= 200) {
					let thisCountry = getResult[data].country;
					var i = countryName.map(x => x.name).indexOf(thisCountry);
					if (i !== -1) {
						let element = document.getElementById(countryName[i].code);
						if (element !== null) {
							element.style.fill = '#F08080';
						}
					}
				}
				if (Math.round(ratio) > 200 && Math.round(ratio) <= 300) {
					let thisCountry = getResult[data].country;
					var i = countryName.map(x => x.name).indexOf(thisCountry);
					if (i !== -1) {
						let element = document.getElementById(countryName[i].code);
						if (element !== null) {
							element.style.fill = '#E9967A';
						}
					}
				}
				if (Math.round(ratio) > 300) {
					let thisCountry = getResult[data].country;
					var i = countryName.map(x => x.name).indexOf(thisCountry);
					if (i !== -1) {
						let element = document.getElementById(countryName[i].code);
						if (element !== null) {
							element.style.fill = '#FFA07A';
						}
					}
				}
			}
			//Continent statistics scripts
			let asia = getResult.map(x => x.country).indexOf('Asia');
			document.getElementById('asiaConfirmed').innerHTML = format.format(getResult[asia].cases.total);
			document.getElementById('asiaDeath').innerHTML = format.format(getResult[asia].deaths.total) + " deaths";

			let au = getResult.map(x => x.country).indexOf('Oceania');
			document.getElementById('auConfirmed').innerHTML = format.format(getResult[au].cases.total);
			document.getElementById('auDeath').innerHTML = format.format(getResult[au].deaths.total) + " deaths";

			let eu = getResult.map(x => x.country).indexOf('Europe');
			document.getElementById('euConfirmed').innerHTML = format.format(getResult[eu].cases.total);
			document.getElementById('euDeath').innerHTML = format.format(getResult[eu].deaths.total) + " deaths";

			let af = getResult.map(x => x.country).indexOf('Africa');
			document.getElementById('afConfirmed').innerHTML = format.format(getResult[af].cases.total);
			document.getElementById('afDeath').innerHTML = format.format(getResult[af].deaths.total) + " deaths";

			let na = getResult.map(x => x.country).indexOf('North-America');
			document.getElementById('naConfirmed').innerHTML = format.format(getResult[na].cases.total);
			document.getElementById('naDeath').innerHTML = format.format(getResult[na].deaths.total) + " deaths";

			let sa = getResult.map(x => x.country).indexOf('South-America');
			document.getElementById('saConfirmed').innerHTML = format.format(getResult[sa].cases.total);
			document.getElementById('saDeath').innerHTML = format.format(getResult[sa].deaths.total) + " deaths";
			
			
		})
		.catch(err => {
			console.error(err);
		});
}
mapColor();

//get index of country
function country() {
	index = countryName.map(x => x.code).indexOf(this.id);
	//console.log(this.id);
	getCountry();
}
//Get country name from API function
function getCountry() {
	var select = document.querySelectorAll('option');//get all select options list
	select.forEach(select => select.removeAttribute('selected'));//reset select option attribute

	fetch("https://covid-193.p.rapidapi.com/countries", {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "490f3f1eacmsha9f808019c36460p132d4bjsneaf41f4d1b47",
			"x-rapidapi-host": "covid-193.p.rapidapi.com"
		}
	})
		.then(response => response.json())
		.then(response => {

			var i = response.response.indexOf(countryName[index].name);//check index from API
			if (i !== -1) {//if data is available from API
				//set select option to selected country
				select[i].setAttribute('selected', 'selected');
				showSearchResult();
			}
			else {//if data is not available from API
				isData = false;
				//set all statistics to 'no data'
				let blanks = ""
				blanks += `
            <div class="card" style="width: max-content;">
            <div class="card-body">
              <h6 class="card-subtitle text-muted"></h6>
              <p class="card-text"><b>Active Cases : </b>no data</p>
              <p class="card-text"><b>New Cases : </b>no data</p>
              <p class="card-text"><b>Critical Cases : </b>no data</p>
              <p class="card-text"><b>Recovered Cases : </b>no data</p>
              <p class="card-text"><b>Total Infected : </b>no data</p>
              <p class="card-text"><b>New Death : </b>no data</p>
              <p class="card-text"><b>Total Death : </b>no data</p>
			  <p class="card-text"><b>Information retrieved on : </b>no data</p>
            </div>
          </div>
            
			`;
				content.innerHTML = blanks;
				showCountry();
			}

		})
		.catch(err => {
			console.error(err);
		});
}

//Fill-in country option from API
let searchOption = document.getElementById("selectCountry");
function searchTable() {
	fetch("https://covid-193.p.rapidapi.com/countries", {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "b1d856148emsh91df552d8017a51p1f927fjsn54a64ed02690",
			"x-rapidapi-host": "covid-193.p.rapidapi.com"
		}
	})
		.then(response => response.json())
		.then(response => {
			let country = response.response;
			//console.log(country);
			for (let i in country) {
				// console.log(country[i]);
				let option = document.createElement("option");
				option.setAttribute("value", country[i]);
				option.innerHTML = `${country[i]}`;
				searchOption.appendChild(option);
				countryAPI.push(country[i]);
			}
		})
		.catch(err => {
			console.error(err);
		});

}
searchTable();

//World Statistic
let world2 = document.getElementById("world");
function worldStats() {
	fetch("https://covid-193.p.rapidapi.com/statistics?country=all", {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "b1d856148emsh91df552d8017a51p1f927fjsn54a64ed02690",
			"x-rapidapi-host": "covid-193.p.rapidapi.com"
		}
	})
		.then(response => response.json())
		.then(response => {
			//console.log(response);
			let world = response.response;
			for (let i in world) {
				let newCase = world[i].cases.new;
				let active = world[i].cases.active;
				let critical = world[i].cases.critical;
				let recover = world[i].cases.recovered;
				let totalInfect = world[i].cases.total;
				let newDeath = world[i].deaths.new;
				let totalDeath = world[i].deaths.total;
				let day = world[i].day;

				let blank1 = "";
				var format = new Intl.NumberFormat();
				blank1 += `
		<div class="card m-auto" style="width:max-content;">
		<div class="card-body">
		  <h5 class="card-title">World-Wide Cases Statistic</h5>
		  <h6 class="card-subtitle mb-2 text-muted"></h6>
		  <p class="card-text"> <b>Active Cases : </b>${format.format(active)}</p>
		  <p class="card-text"><b>New Cases : </b>+${format.format(newCase)}</p>
		  <p class="card-text"><b>Critical Cases : </b>${format.format(critical)}</p>
		  <p class="card-text"><b>Recovered Cases : </b>${format.format(recover)}</p>
		  <p class="card-text"><b>Total Infected : </b>${format.format(totalInfect)}</p>
		  <p class="card-text"><b>New Death : </b>+${format.format(newDeath)}</p>
		  <p class="card-text"><b>Total Death : </b>${format.format(totalDeath)}</p>
		  <p class="card-text"><b>Information retrieved on : </b>${day}</p>
		</div>
	  </div>
		`;
				world2.innerHTML = blank1;

			}
			
		})
		.catch(err => {
			console.error(err);
		});
}
worldStats();

//Display result extracted from API
var chosenCountry;
let content = document.getElementById("tContent");
function showSearchResult() {
	chosenCountry = document.getElementById("selectCountry");
	let result = chosenCountry.options[chosenCountry.selectedIndex].value;
	isData = true;
	//console.log(result);
	fetch("https://covid-193.p.rapidapi.com/statistics", {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "b1d856148emsh91df552d8017a51p1f927fjsn54a64ed02690",
			"x-rapidapi-host": "covid-193.p.rapidapi.com"
		}
	})
		.then(response2 => response2.json())
		.then(response2 => {
			let statistic = response2.response;
			let blanks = "";
			for (let stats in statistic) {
				let statsResult = statistic[stats].country;
				let statsActive = statistic[stats].cases.active;
				let statsRecover = statistic[stats].cases.recovered;
				let statsNew = statistic[stats].cases.new;
				let statsTotal = statistic[stats].cases.total;
				let statsPop = statistic[stats].population;
				let statsCrits = statistic[stats].cases.critical;
				let statsNewDeath = statistic[stats].deaths.new;
				let statsDeath = statistic[stats].deaths.total;
				let statsContinent = statistic[stats].continent;
				let statsDay = statistic[stats].day;
				//console.log(statistic[stats]);
				if (result == statsResult) {
					//console.log(statsResult)

					//Information table
					var format = new Intl.NumberFormat();
					blanks += `
			
            <div class="card p-0 m-auto" style="width: max-content;">
            <div class="card-body p-3">
              <h6 class="card-subtitle text-muted"></h6>
              <p class="card-text"><b>Active Cases : </b>${format.format(statsActive)}</p>
              <p class="card-text"><b>New Cases : </b>+${format.format(statsNew)}</p>
              <p class="card-text"><b>Critical Cases : </b>${format.format(statsCrits)}</p>
              <p class="card-text"><b>Recovered Cases : </b>${format.format(statsRecover)}</p>
              <p class="card-text"><b>Total Infected : </b>${format.format(statsTotal)}</p>
              <p class="card-text"><b>New Death : </b>+${format.format(statsNewDeath)}</p>
              <p class="card-text"><b>Total Death : </b>${format.format(statsDeath)}</p>
			  <p class="card-text"><b>Data retrieved: </b>${statsDay}</p>
            </div>
          </div>
            
			`;
					content.innerHTML = blanks;
					//show map continents
					if (statistic[stats].continent == 'Asia') {
						showAsia();
					}
					else if ((statistic[stats].continent == 'Oceania')) {
						showAu();
					}
					else if (statistic[stats].continent == 'Europe') {
						showEu();
					}
					else if ((statistic[stats].continent == 'Africa')) {
						showAf();
					}
					else if (statistic[stats].continent == 'North-America') {
						showNA();
					}
					else if ((statistic[stats].continent == 'South-America')) {
						showSA();
					}

					//show country name and flag
					showCountry();
				}
			}
			
		})
		.catch(err => {
			console.error(err);
		});
}

//show country name and flag
function showCountry() {
	document.getElementById('flag').removeAttribute('src');
	if (isData == true) {
		var i = countryName.map(x => x.name).indexOf(chosenCountry.value);

		if (i !== -1) {
			//show country flag
			var code = "" + countryName[i].code + ""
			document.getElementById('flag').setAttribute('src', `https://flagcdn.com/w80/${code.toLowerCase()}.png`);
		}
		//show country name
		document.getElementById('countryName').innerHTML = `${chosenCountry.value}`;
		highlightSelected();//highlight selected country
	}
	else {
		//show country name
		document.getElementById('countryName').innerHTML = `${countryName[index].name}`
		//show country flag
		var code = "" + countryName[index].code + ""
		document.getElementById('flag').setAttribute('src', `https://flagcdn.com/w80/${code.toLowerCase()}.png`);
		highlightSelected();//highlight selected country

	}
}
//Highlight selected country on the map
function highlightSelected() {
	//set default, remove class highlight
	countries.forEach(countries => countries.classList.remove('highlight'));

	if (isData == true) {//if data is available
		//add class highlight to chosen country
		var i = countryName.map(x => x.name).indexOf(chosenCountry.value);

		if (i !== -1) {
			//check if path is available on svg file
			var highlightCountry = document.getElementById(`${countryName[i].code}`);
			if (highlightCountry !== null) {
				highlightCountry.classList.add('highlight');//add class highlight
			} else { alert('map not available'); }
		}
		else { alert('content not available'); }
	}

	else {
		var highlightCountry = document.getElementById(`${countryName[index].code}`);
		highlightCountry.classList.add('highlight');
	}

}

//MAP DIV Navigation Functions
let button = document.querySelectorAll('.btn');
function showEu() {
	button.forEach(button => button.classList.remove('active'));
	document.getElementById('eubtn').classList.add('active');

	document.getElementById('Asia').style.display = "none";
	document.getElementById('Australia').style.display = "none";
	document.getElementById('Europe').style.display = "block";
	document.getElementById('Africa').style.display = "none";
	document.getElementById('NorthAmerica').style.display = "none";
	document.getElementById('SouthAmerica').style.display = "none";
}
function showAsia() {
	button.forEach(button => button.classList.remove('active'));
	document.getElementById('asiabtn').classList.add('active');

	document.getElementById('Asia').style.display = "block";
	document.getElementById('Australia').style.display = "none";
	document.getElementById('Europe').style.display = "none";
	document.getElementById('Africa').style.display = "none";
	document.getElementById('NorthAmerica').style.display = "none";
	document.getElementById('SouthAmerica').style.display = "none";
}
function showAu() {
	button.forEach(button => button.classList.remove('active'));
	document.getElementById('aubtn').classList.add('active');

	document.getElementById('Asia').style.display = "none";
	document.getElementById('Australia').style.display = "block";
	document.getElementById('Europe').style.display = "none";
	document.getElementById('Africa').style.display = "none";
	document.getElementById('NorthAmerica').style.display = "none";
	document.getElementById('SouthAmerica').style.display = "none";
}
function showAf() {
	button.forEach(button => button.classList.remove('active'));
	document.getElementById('afbtn').classList.add('active');

	document.getElementById('Asia').style.display = "none";
	document.getElementById('Australia').style.display = "none";
	document.getElementById('Europe').style.display = "none";
	document.getElementById('Africa').style.display = "block";
	document.getElementById('NorthAmerica').style.display = "none";
	document.getElementById('SouthAmerica').style.display = "none";
}
function showNA() {
	button.forEach(button => button.classList.remove('active'));
	document.getElementById('nabtn').classList.add('active');

	document.getElementById('Asia').style.display = "none";
	document.getElementById('Australia').style.display = "none";
	document.getElementById('Europe').style.display = "none";
	document.getElementById('Africa').style.display = "none";
	document.getElementById('NorthAmerica').style.display = "block";
	document.getElementById('SouthAmerica').style.display = "none";
}
function showSA() {
	button.forEach(button => button.classList.remove('active'));
	document.getElementById('sabtn').classList.add('active');

	document.getElementById('Asia').style.display = "none";
	document.getElementById('Australia').style.display = "none";
	document.getElementById('Europe').style.display = "none";
	document.getElementById('Africa').style.display = "none";
	document.getElementById('NorthAmerica').style.display = "none";
	document.getElementById('SouthAmerica').style.display = "block";
}