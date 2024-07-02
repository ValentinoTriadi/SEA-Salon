<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ValentinoTriadi/SEA-Salon">
    <img src="website/public/logo-accent.svg" alt="Logo" width="180" >
  </a>
  <h1>SEA Salon</h1>
  <p align="center">
    A Salon Management System Web-based Application for SEA Salon 
    <br />
    <a href="https://github.com/ValentinoTriadi/SEA-Salon"><strong>Explore the docs »</strong></a>
    ·
    <a href="https://github.com/ValentinoTriadi/SEA-Salon/issues">Report Bug</a>
    <br/>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li><a href="#requirement">Requirement</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#Project-Status">Project Status</a></li>
    <li><a href="#Room-for-Improvement">Room for Improvement</a></li>
    <li><a href="#Acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<img src="website/public/image.png">

This project is a web-based application designed to efficiently manage salon operations. It serves as the final project for the Software Engineering Academy, showcasing the practical application of software engineering principles in a real-world scenario.

<br/>


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

[![Next][Next]][Next-url]
[![Next-Auth][Next-Auth]][Next-Auth-url]
[![Tailwind][Tailwind]][Tailwind-url]
[![Prisma][Prisma]][Prisma-url]
[![Neon][Neon]][Neon-url]
[![PostgreSQL][PostgreSQL]][PostgreSQL-url]

<br/>

### Features

* SEA Salon Information
* User Reviews
* Reservation for Salon Services
* User Dashboard
  * Profile
  * Reservation History
* Admin Dashboard
  * Service Management
  * Branch Management
* Authentication
* Middleware for Authentication

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- Requirement Dependencies -->
## Requirements

1. <a href="https://nodejs.org/en/download/package-manager">Node 20</a>
    

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

1. Clone the repo
   ```sh
   git clone https://github.com/ValentinoTriadi/SEA-Salon.git
   ```
2. ```sh
   cd website
   ```
3. ```sh
   npm install
   ```
4. Add Environment Variables (modify .env.example to .env and fill in the required fields)
5. Set Up Database
   ```sh
   npx prisma generate
   npx prisma db push
   ```
5. ```sh
   npm run dev
   ```
6. Enjoy!

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Deployment

Application is deployed on Vercel on [```https://sea-salon-theta.vercel.app/```](https://sea-salon-theta.vercel.app/)
<br/>
<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- PROJECT STATUS -->
## Project Status
Project status: _incomplete_ 
<br/>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROOM FOR IMPROVEMENT -->
## Room for Improvement
- Improve Interface
- Advanced Reservation System
<br/>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Admin Credentials
- Email: thomas.n@compfest.id
- Password: Admin123
<br/>
<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments
* [Valentino Chryslie Triadi](https://github.com/ValentinoTriadi)

[![LinkedIn][linkedin-shield-valen]][linkedin-valen]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Next-url]: https://nextjs.org/
[Next-Auth-url]: https://next-auth.js.org/
[Prisma-url]: https://www.prisma.io/
[Neon-url]: https://neon.tech/
[PostgreSQL-url]: https://www.postgresql.org/
[Tailwind-url]: https://tailwindcss.com/
[Next]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-Auth]: https://img.shields.io/badge/next%20auth-000000?style=for-the-badge
[Prisma]: https://img.shields.io/badge/Prisma-000000?style=for-the-badge&logo=Prisma&logoColor=white
[Neon]: https://img.shields.io/badge/neon.tech-000000?style=for-the-badge
[PostgreSQL]: https://img.shields.io/badge/postgres-000000?style=for-the-badge&logo=postgresql&logoColor=white
[Tailwind]: https://img.shields.io/badge/tailwind-000000?style=for-the-badge&logo=tailwindcss&logoColor=white
[linkedin-shield-valen]: https://img.shields.io/badge/Linkedin-Valentino%20Triadi-000000?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-valen]: https://linkedin.com/in/valentino-triadi