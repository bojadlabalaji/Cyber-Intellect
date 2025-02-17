
# Cyber-Intellect

Cyber-Intellect is a comprehensive cyber threat dashboard designed to provide real-time monitoring and analysis of cybersecurity events. It features various tools and components to help users stay informed about the latest threats, including live feeds, abuse checks, and breach data.


## Features

- **Dashboard:** View an overview of the latest cyber threats and statistics.
- **Live Feed:** Monitor real-time cybersecurity events as they occur.
- **Timeline:** Track the development history and project milestones.
- **About:** Learn more about the project and the team behind it.
- **Who Have Been Pwned:** Check compromised websites and accounts.
- **IP Abuse Check:** Identify and report abusive IP addresses.
- **Resources:** Access a collection of useful cybersecurity tools and resources.

## Dashboard Screenshots

Below is a screenshots of the Dashboard:
![lading page](https://github.com/user-attachments/assets/92438ebd-b527-4cc5-ad5b-4d522b384ada)

![worldmap hover](https://github.com/user-attachments/assets/461c332a-2d5e-4bf7-93b0-c8f7cdd0ff49)

![live threads](https://github.com/user-attachments/assets/a61d44e7-4930-47d7-8794-0c31c0ffc171)

![sortable wesite list](https://github.com/user-attachments/assets/4b9d6132-cc99-470c-a4ce-60649880728e)

![ip-check](https://github.com/user-attachments/assets/667a90c7-f41d-4062-aa3d-748f22d277a3)


## Project Structure

```
public/
src/
  ├── App.css
  ├── App.jsx
  ├── assets/
  ├── axiosConfig.js
  ├── components/
  │   ├── Layout.jsx
  │   ├── LineChart.jsx
  │   ├── Navbar.jsx
  │   └── WorldMap.jsx
  ├── data/
  │   ├── breaches.json
  │   ├── latest_country_category_counts.json
  │   ├── tooltip-data.jsx
  │   └── world-topo.json
  ├── index.css
  ├── main.jsx
  ├── pages/
  │   ├── About.jsx
  │   ├── Dashboard.jsx
  │   ├── IPAbuseCheck.jsx
  │   ├── LiveFeed.jsx
  │   ├── NotFound.jsx
  │   ├── Resources.jsx
  │   ├── Timeline.jsx
  │   └── WhoHaveBeenPwned.jsx
  ├── store/
  ├── theme.js
  └── utils/
eslint.config.js
index.html
package.json
Readme.md
vite.config.js


```
## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/Cyber-Intellect.git
   cd Cyber-Intellect
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```

## Building for Production

Run the following command to build the project for production:
```sh
npm run build
```

## Deployment

Deploy the project using:
```sh
npm run deploy
```

## Configuration

- The project uses Vite for development and bundling.
- The base path for the routes is set to `/Cyber-Intellect/` in the router configuration.
- Additional settings and configurations can be adjusted in the `vite.config.js` file.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).





