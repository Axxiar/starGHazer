window.onload = () => {
    fetch("/stats").then((res) => {
        res.json().then((resjson) => {
            const ctx = document.getElementById('starsChart');

            const labels = resjson.map((e) => { 
                return  e.date.day + "/" + e.date.month + "/" +e.date.year
            })

            const data = {
                labels: labels,
                datasets: [{
                    label: 'ciso-assistant ⭐',
                    data: resjson.map((e) => { return e.starCount; }),
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0
                }]
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
                        text: 'Chart.js Line Chart'
                    }
                    }
                },
            };
            new Chart(ctx, config);
        });
    });
};
