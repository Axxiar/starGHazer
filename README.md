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
- Repo's stars
- Repo's issues
- Repo's forks
- Repo's branches

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

### Installation

Soon...

<!-- ROADMAP -->
## Roadmap (ordered by importance)

- [X]  🗝 Support for events
- [ ]  🗝 Setup config files and guide
- [ ]  🗝 Typescript rewrite
- [ ]  🔥 Visually select displayed year data
- [ ]  🔥 Deployment config and guide for linux based server using cronjobs
- [ ]  ❓ Support for multiple days events
- [ ]  ❓ More statistics

🗝: key feature
🔥: cool extra feature idea 
❓: extra feature idea (wil probably not be added or at least not soon)


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
