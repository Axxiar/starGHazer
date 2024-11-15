window.onload = () => {
    fetch("/stats").then((res) => {
        res.json().then((resjson) => {
            const ctx = document.getElementById('starsChart');

            const labels = resjson.map((e) => {
                return e.date.day + "/" + e.date.month + "/" + e.date.year
            })

            const data = {
                labels: labels,
                datasets: [
                    {
                        label: '⭐',
                        data: resjson.map((e) => { return e.starCount; }),
                        borderColor: '#5d4493',
                        tension: 0
                    },
                    {
                        label: '🎯',
                        data: resjson.map((e) => { return e.issueCount; }),
                        borderColor: '#40a6c6',
                        tension: 0
                    },
                    {
                        label: '🔱',
                        data: resjson.map((e) => { return e.forkCount; }),
                        borderColor: '#fedc8c',
                        tension: 0
                    },
                    {
                        label: '🌿',
                        data: resjson.map((e) => { return e.branchCount; }),
                        borderColor: '#78c8ae',
                        tension: 0
                    }
                ]
            };

            const config = {
                type: 'line',
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Intuitem: ciso-assistant'
                        }
                    }
                },
            };
            new Chart(ctx, config);
        });
    });
};
