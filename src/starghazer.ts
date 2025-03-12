import fs from 'fs/promises';
import http from 'http';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config()

const REPO_ENDPOINT = `https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}`
const STAT_PATH = "./data/ciso-assistant-stats.json"
const EVENT_PATH = "./data/ciso-assistant-events.json"
const URLS = ["/", "/index.html", "/public/index.js"]

const HELP_MESSAGE = `soon tm tm`

interface RepoStats {
    stargazers_count: number;
    open_issues_count: number;
    forks_count: number;
}

interface Branch {
    name: string;
}

interface StatEntry {
    date: {
        year: number;
        month: number;
        day: number;
        hours: number;
        minutes: number;
    };
    starCount: number;
    issueCount: number;
    forkCount: number;
    branchCount: number;
}


async function fetchAPI<T>(url: string): Promise<T | {}> {
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


function getRepoStars(stats: RepoStats, debug = true): number {
    if (debug)
        console.log(`[Intuitem] ciso-assistant: ${stats.stargazers_count}⭐`);
    return stats.stargazers_count;
}


function getRepoIssues(stats: RepoStats, debug = true): number {
    if (debug)
        console.log(`[Intuitem] ciso-assistant (open issues): ${stats.open_issues_count}🎯`);
    return stats.open_issues_count;
}

function getRepoForks(stats: RepoStats, debug = true): number {
    if (debug)
        console.log(`[Intuitem] ciso-assistant (forks): ${stats.forks_count}🔱`);
    return stats.forks_count;
}

async function getRepoBranches(perPage = 100, debug = true): Promise<number> {
    let current_branches_len = 0;
    let page_index = 1;
    let total = 0;

    // TODO: rewrite this loop with better break condition
    do {
        const branches = await fetchAPI<Branch[]>(
            REPO_ENDPOINT + `/branches?per_page=${perPage}&page=${page_index}`
        );
        if (!Array.isArray(branches) || branches.length === 0) return -1;

        current_branches_len = branches.length;
        total += current_branches_len;
        page_index++;
    } while (current_branches_len == perPage)

    if (debug)
        console.log(`[Intuitem] ciso-assistant (branches): ${total}🌿`);
    return total;
}

async function loadJson<T>(path: string): Promise<T[]> {
    try {
        const data = await fs.readFile(path, 'utf-8');
        return JSON.parse(data) as T[];
    }
    catch (err) {
        console.error('Error reading or parsing file:', err);
        return [];
    }
}

async function saveToJson(stats: RepoStats, debug = true): Promise<void> {

    const starCount = getRepoStars(stats, debug);
    const issueCount = getRepoIssues(stats, debug);
    const forkCount = getRepoForks(stats, debug);
    const branchCount = await getRepoBranches(100, debug);

    if (starCount === -1 || issueCount === -1 || forkCount === -1 || branchCount === -1)
        return;

    const jsonData = await loadJson(STAT_PATH);
    const today = new Date();
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
    await fs.writeFile(STAT_PATH, JSON.stringify(jsonData));
}

// async function popLastJson() {
//     console.log("Security: Are you sure ?");
//     return;
//
//     jsonData = await loadJson(STAT_PATH);
//     const poped = jsonData.pop();
//
//     fs.writeFile(STAT_PATH, JSON.stringify(jsonData), (err) => {
//         if (err) {
//             console.error('Error poping from file:', err);
//         }
//     });
//     return poped;
// }


async function runServer(): Promise<void> {
    const PORT = 5000;
    const server = http.createServer(async (req, res) => {

        if (req.url == "/stats") {
            const stats = await loadJson<StatEntry>(STAT_PATH);

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(stats));
        }

        else if (req.url == "/events") {
            const events = await loadJson<any>(EVENT_PATH);

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(events));
        }


        else if (URLS.includes(req.url || '')) {
            try {
                let contentType = "text/html";
                let reqPath = "index.html";

                if (req.url == "/public/index.js") {
                    contentType = "application/javascript";
                    reqPath = "index.js";
                }
                const filePath = path.join(__dirname, "../public", reqPath);

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
    const args = process.argv;
    if (args.length == 3) {
        switch (args[2].toLowerCase()) {
            case "--serve": case "-s":
                runServer();
                break;
            case "--fetch": case "-f":
                const jsonStats = await fetchAPI<RepoStats>(REPO_ENDPOINT);
                if (jsonStats && typeof jsonStats === 'object' && Object.keys(jsonStats).length > 0) {
                    await saveToJson(jsonStats as RepoStats, true);
                }
                break;
            case "--help": case "-h":
                console.log(HELP_MESSAGE)
                break;
            default:
                console.error(`Unknown option: ${args[2]}\nTry 'node .../starghazer.js --help`)
        }
    }
    else
        console.error(`Unknown option: ${args[2]}\nTry 'node .../starghazer.js --help`)
}

main();
