const fs = require('fs/promises');
const http = require('http');
const path = require('path');

const REPO_ENDPOINT = "https://api.github.com/repos/intuitem/ciso-assistant-community"
const STAT_PATH = "./res/ciso-assistant-stats.json"
const URLS = ["/", "/index.html", "/public/index.js"]


async function fetchAPI(url) {
    try {
        const res = await fetch(url);
        if (res.status === 200) {
            return await res.json();
        }
        return {};
    }
    catch (err) {
        console.error(`Error fetching ${url} : ${err}`);
        return {};
    }
}


function getRepoStars(stats, debug = true) {
    if (debug)
        console.log(`[Intuitem] ciso-assistant: ${stats.stargazers_count}⭐`);
    return stats.stargazers_count;
}


function getRepoIssues(stats, debug = true) {
    if (debug)
        console.log(`[Intuitem] ciso-assistant (open issues): ${stats.open_issues_count}🎯`);
    return stats.open_issues_count;
}

function getRepoForks(stats, debug = true) {
    if (debug)
        console.log(`[Intuitem] ciso-assistant (forks): ${stats.forks_count}🔱`);
    return stats.forks_count;
}

async function getRepoBranches(stats, debug = true) {
    const branches = await fetchAPI(REPO_ENDPOINT + "/branches");

    if (branches == {}) return -1;

    if (debug)
        console.log(`[Intuitem] ciso-assistant (branches): ${branches.length}🌿`);
    return branches.length;
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

async function saveToJson(stats, debug = true) {

    starCount = getRepoStars(stats, debug);
    issueCount = getRepoIssues(stats, debug);
    forkCount = getRepoForks(stats, debug);
    branchCount = await getRepoBranches(stats, debug);

    if (starCount === -1 || issueCount === -1 || forkCount === -1 || branchCount === -1)
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
        "issueCount": issueCount,
        "forkCount": forkCount,
        "branchCount": branchCount
    });
    fs.writeFile(STAT_PATH, JSON.stringify(jsonData), (err) => {
        if (err) {
            console.error('Error appending to file:', err);
        }
    });
}

async function popLastJson() {
    console.log("Security: Are you sure ?");
    return;

    jsonData = await loadJson();
    const poped = jsonData.pop();

    fs.writeFile(STAT_PATH, JSON.stringify(jsonData), (err) => {
        if (err) {
            console.error('Error poping from file:', err);
        }
    });
    return poped;
}


async function displayOnServer() {
    const PORT = 5000;
    const server = http.createServer(async (req, res) => {

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
                res.end("Uh oh, looks like i have reading issues...");
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
    // jsonStats = await fetchAPI(REPO_ENDPOINT);
    // await saveToJson(jsonStats, true);
    displayOnServer();
}


// -- MAIN --
main();
