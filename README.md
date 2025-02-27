<a name="readme-top"></a>

<!-- INTRO -->
# 🌟 starGHazer

### Track statistics of a GitHub repo without authentication

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

Theses are the languages/frameworks/libraries used.

[![NodeJS][node-shield]](https://nodejs.org/en) <br>
[![Chart.js][chart-shield]](https://www.chartjs.org/)



<!-- GETTING STARTED -->
## Getting Started

### Installation steps

Make sure you have `node` installed and the `dotenv` package.

Clone the repo and cd into it
```bash
git clone https://github.com/Axxiar/starGHazer.git
cd starGHazer/
```
Rename `.env.example` file to `.env`

Edit `.env` and replace with the owner (`REPO_OWNER`) and name (`REPO_NAME`) of the repository you want to track

> e.g. to track this repo : https://github.com/catppuccin/palette, the owner is "catppuccin" and the repo name is "palette",
so you should have this as `.env` file :
> ```env
> REPO_OWNER="catppuccin"
> REPO_NAME="palette"
> ```

Finally, start the main program and follow instructions
```bash
node starghzer.js
```

<!-- ROADMAP -->
## Roadmap (ordered by importance)

- [X]  🗝 Support for events
- [ ]  🗝 Setup config files and guide
- [ ]  🗝 Typescript rewrite
- [ ]  🗝 Support separated stats file to avoid large files
- [ ]  🔥 Visually select displayed year data
- [ ]  🔥 Terminal wizard for first setup
- [ ]  🔥 Deployment config and guide for linux based server using cronjobs
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
[chart-shield]: https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=fff
