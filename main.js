
//Ajax pour récupérer les données json
const getData = async () => {
    try{
        const response = await fetch("pando_data.json");
        return await response.json();
    } catch(error) {
        console.log(error);
    }
}

//Récupérer les données
getData().then(datapoints   => {
    //Filtre et récupérer le type unique et leurs valeurs 
    const typeUnique = [];

    datapoints.map(item => {
        if (!typeUnique.includes(item.measure_type)){
            typeUnique.push(item.measure_type);
        }
        return (typeUnique)
    });

    //CO2
    let c02Total = 0;
    
    datapoints.map(item => {
        if (item.measure_type == 'CO2'){
            c02Total += item.measure_float;
        }
        return (c02Total)
    })

    //HUM
    let humTotal = 0;

    datapoints.map(item => {
        if (item.measure_type == 'HUM'){
            humTotal += item.measure_float;
        }
        return (humTotal)
    })

    //TMP
    let tmpTotal = 0 ;

    datapoints.map(item => {
        if (item.measure_type == 'TMP'){
            tmpTotal += item.measure_float;
        }
        return (tmpTotal)
    })

    //VOCT
    let voctTotal = 0 ;

    datapoints.map(item => {
        if (item.measure_type == 'VOCT'){
            voctTotal += item.measure_float;
        }
        return (voctTotal)
    })

    //tableau de valeur de chaque type de pollution de l'air
    const tabValeurs = [c02Total, humTotal, tmpTotal, voctTotal];
   
    //Mise à jour des informations à affciher 
    mychart.config.data.labels = typeUnique;
    mychart.config.data.datasets[0].data = tabValeurs;
    mychart.update();

})


//Les données Chart.js 
const data = {
    labels: [],
    datasets: [{
        label: 'Visualisation des données des capteurs de l’environnement ',
        data: [],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
};

//Configuration du chart.js
const config = {
    type: 'bar',
    data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
}
//créer une instance graphique
const mychart = new Chart(document.getElementById('myChart'), config);


