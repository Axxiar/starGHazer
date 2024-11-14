const fs = require('fs/promises');
const http = require('http');
const path = require('path')

const REPO_ENDPOINT = "https://api.github.com/repos/intuitem/ciso-assistant-community"
const STAT_PATH = "./res/ciso-assistant-stats.json"
const URLS = ["/", "/index.html", "/public/index.js" ]

async function getRepoStars(debug = true) {
    try {
        const res = await fetch(REPO_ENDPOINT);
        if (res.status === 200) {
            const infos = await res.json();
            if (debug)
                console.log(`[Intuitem] ciso-assistant: ${infos.stargazers_count}⭐`);
            return infos.stargazers_count;
        }
        else if (res.status === 403 && debug)
            console.log("Forbidden. Exceeded request rate ?");
        return -1;
    }
    catch (err) {
        console.error("Error fetching repo data:", err);
        return -1;
    }
}

async function loadJson() {
    try {
        const data = await fs.readFile(STAT_PATH);
        return JSON.parse(data);
    }
    catch (err) {
        console.error('Error reading or parsing file:', err);
        return [];
    }
}

async function saveToJson(starCount) {
    if (starCount === -1)
        return;

    jsonData = await loadJson();
    let today = new Date();
    jsonData.push({
        "date": {
            "year": today.getFullYear(),
            "month": today.getMonth() + 1,
            "day": today.getDate(),
            "hours": today.getHours(),
            "minutes": today.getMinutes(),
        },
        "starCount": starCount,
    });
    fs.writeFile(STAT_PATH, JSON.stringify(jsonData), (err) => {
        if (err) {
            console.error('Error appending to file:', err);
        }
    });
}


async function displayOnServer() {
    const PORT = 5000;
    const server = http.createServer(async(req, res) => {

        // if (req.url == '/favicon.ico') {
        //     // .ico = 'image/x-icon' or 'image/vnd.microsoft.icon'
        //     const FAVICON = path.join(__dirname, 'public', 'favicon.png');
        //     console.log(__dirname)
        //     console.log("ayo bla")
        //     const data = await fs.readFile("favicon.ico");
        //     res.setHeader('Content-Type', 'image/x-icon');
        //     res.end(data);
        // }

        if (req.url == "/stats") {
            const stats = await loadJson();

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(stats));
        } 

        else if (URLS.includes(req.url)) {
            try {
                let contentType = "text/html";
                let reqPath = "index.html";

                if (req.url == "/public/index.js") {
                    contentType = "application/javascript";
                    reqPath = "index.js";
                }
                const filePath = path.join(__dirname, "public", reqPath);

                const data = await fs.readFile(filePath);

                res.writeHead(200, { "Content-Type": contentType });
                res.end(data);

            } catch (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Uh oh, looks like i have reading troubles...");
            }
        }

        else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Where are you going ? THIS is 404");
        }
    });
    server.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}

async function main() {
    // starCount = await getRepoStars(true);
    // saveToJson(starCount);
   displayOnServer();
}


// -- MAIN --
main();
