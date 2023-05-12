var data = [];

const form = document.getElementById("filter-form");
const subtype = form.getAttribute("subtype");

var indexName;
var fetchUrl;
var borderColor;
var backgroundColor;

if(subtype == "temperature"){
    indexName = "Température (°C)";
    fetchUrl = "http://localhost:8080/api/entries/temperature";
    borderColor = 'rgb(255, 99, 132)';
    backgroundColor = 'rgba(255, 99, 132, 0.2)';
}
else if(subtype == "humidity"){
    fetchUrl = "http://localhost:8080/api/entries/humidity";
}
else if(subtype == "co2"){
    indexName = "CO2 (ppm)";
    fetchUrl = "http://localhost:8080/api/entries/CO2";
    borderColor = 'rgb(255, 192, 0)';
    backgroundColor = 'rgba(255, 192, 0, 0.2)';
}
else if(subtype == "no2"){
    indexName = "NO2 (ppm)";
    fetchUrl = "http://localhost:8080/api/entries/NO2";
    borderColor = 'rgb(255, 159, 64)';
    backgroundColor = 'rgba(255, 159, 64, 0.2)';
}
else if(subtype == "cov"){
    indexName = "COV (ppb)";
    fetchUrl = "http://localhost:8080/api/entries/COV";
    borderColor = 'rgb(153, 102, 255)';
    backgroundColor = 'rgba(153, 102, 255, 0.2)';
}
else if(subtype == "pm"){
    indexName = "Particules Fines (µg/m³)";
    fetchUrl = "http://localhost:8080/api/entries/PM";
    borderColor = 'rgb(75, 192, 192)';
    backgroundColor = 'rgba(75, 192, 192, 0.2)';
}

var TempValues = [];
var abs_hum = [];

function computeAbsoluteHumidity(humidity, temperature) {
    const t = calculateMeanTemperature(temperature, humidity);

    for (let i = 0; i < humidity.length; i++) {
      const rh = humidity[i].value;
      const ah = 216.7 * ((rh/100) * 6.112 * Math.exp((17.62*t)/(243.12 + t))) / (273.15 + t);
      abs_hum.push(ah);
    }
}
  
function calculateMeanTemperature(temperature, humidity) {
    const start = humidity[0].timestamp;
    const end = humidity[humidity.length - 1].timestamp;
    const tempInRange = temperature.filter((temp) => temp.timestamp >= start && temp.timestamp <= end);
    const sum = tempInRange.reduce((acc, curr) => acc + curr.value, 0);
    return sum / tempInRange.length;
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
}

function createChart(chartData, timestampData) {

    const formattedTimestamps = timestampData.map(timestamp => {
        return formatTimestamp(timestamp);
    });

    let fdatasets = [];


    if (subtype === "humidity") {
        fdatasets.push({
            label: "Humidité relative (%)",
            data: chartData,
            borderColor: 'rgb(99, 99, 255)',
            backgroundColor: 'rgba(99, 99, 255, 0.2)',
            yAxisID: 'y-axis-1',
            tension: 0.2,
        });
        fdatasets.push({
            label: "Humidité absolue (g/m³)",
            data: abs_hum,
            borderColor: 'rgb(150, 150, 150)',
            backgroundColor: 'rgba(150, 150, 150, 0.2)',
            yAxisID: 'y-axis-2',
            tension: 0.2,
        });
    }
    else{
        fdatasets.push({
            label: indexName,
            data: chartData,
            borderColor: borderColor,
            backgroundColor: backgroundColor,
            tension: 0.4,
        });
    }

    const chart = new Chart('chart', {
        type: 'line',
        data: {
            labels: formattedTimestamps,
            datasets: fdatasets
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10
                    }
                }
            },
            responsive: false
        }
    });

    return chart;
}

var tempchart;
const selectStart = document.getElementById('select-start');
const selectEnd = document.getElementById('select-end');

function computeStats(data, startTimestamp, endTimestamp) {

    const filteredData = data.filter((elem) => {
        return elem.timestamp >= startTimestamp && elem.timestamp <= endTimestamp;
    });

    const maxTemp = Math.max(...filteredData.map((elem) => elem.value));

    const minTemp = Math.min(...filteredData.map((elem) => elem.value));

    const avgTemp =
        filteredData.reduce((sum, elem) => sum + elem.value, 0) /
        filteredData.length;

    return {
        maxTemp: maxTemp,
        minTemp: minTemp,
        avgTemp: avgTemp,
    };
}

function loadDBValues() {

    fetch("http://localhost:8080/api/entries/temperature")
        .then(response => response.json())
        .then(dbData => {
            const tData = dbData.map(row => {
                return {
                    value: row.value,
                    timestamp: new Date(row.createdAt).getTime()
                }
            });
            TempValues = tData;
            fetch(fetchUrl)
                .then(response => response.json())
                .then(dbData => {
                    const newData = dbData.map(row => {
                        return {
                            value: row.value,
                            timestamp: new Date(row.createdAt).getTime()
                        }
                    });
                    data = newData;
                    
                    if(subtype == "humidity")
                        computeAbsoluteHumidity(newData, TempValues);

                    const chartData = data.map(entry => entry.value);
                    const timestampData = data.map(entry => entry.timestamp);
                    mychart = createChart(chartData, timestampData);

                    const timestamps = data.map(obj => obj.timestamp);

                    for (let ts = 0; ts < timestamps.length; ts++) {
                        const option = document.createElement('option');
                        option.text = new Date(timestamps[ts]).toLocaleString('fr-FR', {
                            day: 'numeric',
                            month: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric'
                        });
                        option.value = timestamps[ts];
                        selectStart.add(option);


                        const endOption = document.createElement('option');
                        endOption.text = new Date(timestamps[ts]).toLocaleString('fr-FR', {
                            day: 'numeric',
                            month: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric'
                        });
                        endOption.value = timestamps[ts];
                        selectEnd.add(endOption);
                    }

                    selectStart.value = timestamps[0];

                    selectEnd.value = timestamps[timestamps.length - 1];

                    let stats = computeStats(data, timestamps[0], timestamps[timestamps.length - 1]);

                    var peakTemp = stats.maxTemp;
                    var avgTemp = stats.avgTemp;
                    var minTemp = stats.minTemp;

                    var peakSpan = document.getElementById("peakvalue");
                    var avgSpan = document.getElementById("avgvalue");
                    var minSpan = document.getElementById("minvalue");

                    peakSpan.innerHTML = peakTemp;
                    avgSpan.innerHTML = avgTemp.toFixed(2);
                    minSpan.innerHTML = minTemp;
                });
    }).catch(error => console.error(error));
}
loadDBValues();



function updateChartData(chart, data, startDate, endDate) {
    const filteredData = data.filter((item) => {
        const itemDate = new Date(item.timestamp);
        return itemDate >= new Date(parseInt(startDate)) && itemDate <= new Date(parseInt(endDate));
    });

    chart.data.datasets[0].data = filteredData.map((item) => item.value);
    chart.data.labels = filteredData.map((item) => formatTimestamp(item.timestamp));
    chart.update();
}


document.getElementById('filter-form').addEventListener('change', (event) => {
    event.preventDefault();

    const startDate = selectStart.value;
    const endDate = selectEnd.value;

    if (endDate < startDate) {
        alert('La date de fin doit être supérieure à la date de début.');
        return;
    }

    let stats = computeStats(data, startDate, endDate);

    var peakTemp = stats.maxTemp;
    var avgTemp = stats.avgTemp;
    var minTemp = stats.minTemp;

    var peakSpan = document.getElementById("peakvalue");
    var avgSpan = document.getElementById("avgvalue");
    var minSpan = document.getElementById("minvalue");

    peakSpan.innerHTML = peakTemp;
    avgSpan.innerHTML = avgTemp.toFixed(2);
    minSpan.innerHTML = minTemp;

    updateChartData(mychart, data, startDate, endDate);
});