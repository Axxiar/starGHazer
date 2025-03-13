interface StatData {
    date: {
        year: number;
        month: number;
        day: number;
    };
    starCount: number;
    issueCount: number;
    forkCount: number;
    branchCount: number;
    description?: string;
}

interface EventData {
    date: {
        year: number;
        month: number;
        day: number;
    };
    event: string;
}

interface Annotation {
    type: 'line';
    borderColor: string;
    borderWidth: number;
    label: {
        color: string;
        borderColor: string;
        borderWidth: number;
        backgroundColor: string;
        display: boolean;
        content: string;
        position: 'start';
    };
    scaleID: 'x';
    value: string;
}

window.addEventListener('load', async () => {
    try {
        const statsResponse = await fetch('/stats');
        const statsData: StatData[] = await statsResponse.json();

        const eventsResponse = await fetch('/events');
        const eventsData: EventData[] = await eventsResponse.json();

        console.log(eventsData);
        displayData(statsData, eventsData, 2025);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});


declare const Chart: any;

function buildAnnotations(eventJson: EventData[]): Annotation[] {
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

function displayData(statJson: StatData[], eventJson: EventData[], selectedYear: number | null = null): void {

    const ctx = document.getElementById('starsChart') as HTMLCanvasElement;

    if (selectedYear) {
        statJson = statJson.filter((e) => e.date.year == selectedYear);
        eventJson = eventJson.filter((e) => e.date.year == selectedYear);
    }
    const labels = statJson.map((e) => { return e.date.day + "/" + e.date.month + "/" + e.date.year; })
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
                pointHoverBackgroundColor: "#c6d0f5",
            },
            {
                label: '🎯 issues ',
                data: statJson.map((e) => { return e.issueCount; }),
                borderColor: '#40a6c6',
                tension: 0,
                pointRadius: 7,
                pointHoverRadius: 9,
                pointHoverBackgroundColor: "#c6d0f5",
                hidden: true
            },
            {
                label: '🔱 forks ',
                data: statJson.map((e) => { return e.forkCount; }),
                borderColor: '#fedc8c',
                tension: 0,
                pointRadius: 7,
                pointHoverRadius: 9,
                pointHoverBackgroundColor: "#c6d0f5",
                hidden: true
            },
            {
                label: '🌿 branches ',
                data: statJson.map((e) => { return e.branchCount; }),
                borderColor: '#78c8ae',
                tension: 0,
                pointRadius: 7,
                pointHoverRadius: 9,
                pointHoverBackgroundColor: "#c6d0f5",
                hidden: true
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
                    label: function (tooltipItem: any) {
                        var description = tooltipItem.raw?.description || 'No description available';
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

    new Chart(ctx, config);
    Chart.defaults.color = '#c6d0f5';
}
