window.onload = () => {
    fetch("/stats").then((res) => {
        res.json().then((statJson) => {

            fetch("/events").then((res2) => {
                res2.json().then((eventJson) => {
                    console.log(eventJson);
                    displayData(statJson, eventJson);
                });
            });
        });
    });
};

function buildAnnotations(eventJson) {
    return eventJson.map((e) => {
        return {
            type: 'line',
            borderColor: '#e78284',
            borderWidth: 1,
            label: {
                color: '#e78284',
                borderColor: '#e78284',
                borderWidth: 1,
                backgroundColor: '#303446',
                display: true,
                content: e.event,
                position: 'start',
            },
            scaleID: 'x',
            value: e.date.day + "/" + e.date.month + "/" + e.date.year
        };
    })
}

function displayData(statJson, eventJson) {
    const ctx = document.getElementById('starsChart');

    const labels = statJson.map((e) => {
        return e.date.day + "/" + e.date.month + "/" + e.date.year
    })
    const statData = {
        labels: labels,
        datasets: [
            {
                label: '⭐ stars ',
                data: statJson.map((e) => { return e.starCount; }),
                borderColor: '#7157a2',
                tension: 0,
                pointRadius: 7,
                pointHoverRadius: 9,
                pointHoverBackgroundColor: "#c6d0f5"
            },
            {
                label: '🎯 issues ',
                data: statJson.map((e) => { return e.issueCount; }),
                borderColor: '#40a6c6',
                tension: 0,
                pointRadius: 7,
                pointHoverRadius: 9,
                pointHoverBackgroundColor: "#c6d0f5"
            },
            {
                label: '🔱 forks ',
                data: statJson.map((e) => { return e.forkCount; }),
                borderColor: '#fedc8c',
                tension: 0,
                pointRadius: 7,
                pointHoverRadius: 9,
                pointHoverBackgroundColor: "#c6d0f5"
            },
            {
                label: '🌿 branches ',
                data: statJson.map((e) => { return e.branchCount; }),
                borderColor: '#78c8ae',
                tension: 0,
                pointRadius: 7,
                pointHoverRadius: 9,
                pointHoverBackgroundColor: "#c6d0f5"
            }

        ]
    };

    const config = {
        type: 'line',
        data: statData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#c6d0f5'
                    }
                },
                title: {
                    display: true,
                    text: 'Intuitem: ciso-assistant',
                    font: {
                        size: 18
                    }
                },
                annotation: {
                    common: {
                        drawTime: 'afterDatasetsDraw'
                    },
                    annotations: buildAnnotations(eventJson)
                }
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        var description = tooltipItem.raw.description || 'No description available';
                        return description;
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#f2d5cf'
                    },
                    grid: {
                        color: '#1e1e2e'
                    }
                },
                y: {
                    ticks: {
                        color: '#fff'
                    },
                    grid: {
                        color: '#1e1e2e'
                    }
                }
            }
        }
    };

    a = new Chart(ctx, config);
    Chart.defaults.color = '#c6d0f5';
}
