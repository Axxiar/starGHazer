<a name="readme-top"></a>

<!-- INTRO -->
# 🌟 starGHazer

### Easily track statistics of a GitHub repo without authentication

![image](https://github.com/user-attachments/assets/9e03ce79-2724-4652-80d9-c639481d8fd1)

🚧 *This project is under construction* 🚧



## About The Project

> [!NOTE]  
> The name comes from one of the API endpoint called stargazer *(= all the people that starred a repo)*, combined with GH for GitHub initials

This project allows you to track some statistics of a GitHub repo using GitHub's Rest API. Currently, it tracks count of : 
- ⭐ Repo's stars
- 🎯 Repo's issues
- 🔱 Repo's forks
- 🌿 Repo's branches

You also have the ability to easily add events

No authentication is needed.

Every time you will call the main program, 1 call to the API is made + 1 or more depending on how much branch your repo has (1 request made every 100 branches, which is the [max pagination returned by the endpoint](https://docs.github.com/en/rest/branches/branches?apiVersion=2022-11-28#list-branches)). 

> [!IMPORTANT]
> The API rate limit is 60 call/hour so if you start the main program to many times and/or have too many branches on fetched repo, you might end-up being blocked for an hour


### Built With

[![NodeJS][node-shield]](https://nodejs.org/en) <br>
[![Chart.js][chart-shield]](https://www.chartjs.org/) <br>
[![TypeScript][ts-shield]](https://www.typescriptlang.org/)



<!-- GETTING STARTED -->
## Getting Started

### Requirements

- node 20+
- npm 10.9+
- tsc 4+ (typescript)

### Installation steps

1. Clone the repo and cd into it
```bash
git clone https://github.com/Axxiar/starGHazer.git
cd starGHazer/
```
2. Rename `.env.example` file to `.env`

3. Edit `.env` and replace with the owner (`REPO_OWNER`) and name (`REPO_NAME`) of the repository you want to track

  > e.g. to track this repo : https://github.com/catppuccin/palette, the owner is "catppuccin" and the repo name is "palette",
  so you should have this as `.env` file :
  > ```env
  > REPO_OWNER="catppuccin"
  > REPO_NAME="palette"
  > ```

4. Install dependecies and build the project
```sh
npm install
npm run build
```

5. Finally, start the project
```sh
npm run all  # equivalent to:  node dist/starghazer.js --fetch && node dist/starghazer.js --serve
```

### NPM scripts

Here are available npm scripts : 

`build:server`: builds js server-side files from typescript

`build:client`: builds js client-side files from typescript

`build`: build:server & build:client

`server`: start the server

`fetch`: fetch api data and store them

`all`: build & fetch & server

`dev`: build & server

`clean`: remove built files

<!-- ROADMAP -->
## Roadmap (ordered by importance)

- [X]  🗝 Support for events
- [ ]  🗝 Setup config files and guide
- [X]  🗝 Typescript rewrite
- [ ]  🗝 Support separated stats file to avoid large files
- [ ]  :fire: Support [Mermaid](https://mermaid.js.org/) graph for READMEs 
- [ ]  🔥 Visually select displayed year data
- [ ]  🔥 Terminal wizard for first setup
- [ ]  🔥 Add CI/CD
- [ ]  🔥 Deployment config and guide for linux/raspberry pi based server using cronjobs
- [ ]  ❓ Support for multiple days events
- [ ]  ❓ More statistics

🗝: *key feature*
🔥: *cool extra feature idea*
❓: *extra feature idea (wil probably not be added or at least not soon)*


<!-- CONTRIBUTING --> 
## Contributing

If you wish to contribute, feel free to do so ! You can fork and open PRs.


<!-- LICENSE -->
## License
[GNU General Public License v3.0](./LICENSE)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[node-shield]: https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[ts-shield]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[chart-shield]: https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=fff
