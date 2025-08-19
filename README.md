# 👨‍💻 Jhonatasfender - Full Stack Developer Portfolio 🚀

This is the repository for my personal portfolio, developed with Angular and TypeScript. The project features an interactive terminal interface that allows visitors to explore my skills, projects, and contact information in a unique and engaging way.

## 🛠️ Technologies Used

- Angular 19
- TypeScript
- SCSS
- Ngx-translate (Internationalization)
- Fira Code (Font)

## 🚀 Features

- Interactive terminal interface
- Multi-language support (Portuguese and English)
- Responsive design
- Interactive commands:
  - `help` - Lists all available commands
  - `about` - Displays information about me
  - `skills` - Shows my technical skills
  - `projects` - Lists my projects
  - `contact` - Displays contact information
  - `clear` - Clears the terminal
  - `lang` - Changes the interface language

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── loading/          # Loading component
│   │   ├── core/
│   │   │   ├── interfaces/       # System interfaces
│   │   │   └── services/         # Main services
│   │   ├── help-panel/          # Help panel
│   │   ├── terminal/            # Main terminal component
│   │   │   ├── commands/        # Command implementations
│   │   │   ├── interfaces/      # Terminal interfaces
│   │   │   └── services/        # Terminal services
│   │   ├── app.component.*      # Root component
│   │   ├── app.config.ts        # Application configuration
│   │   └── app.routes.ts        # Application routes
│   ├── assets/
│   │   ├── fonts/              # Custom fonts
│   │   └── i18n/               # Translation files
│   └── styles.scss             # Global styles
```

## 🚀 How to Run

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/jhonatasfender/jhonatasfender.github.io.git
cd jhonatasfender.github.io
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
ng serve
```

4. Access `http://localhost:4200` in your browser

### Production Build

```bash
ng build
```

The build files will be generated in the `dist/jhonatasfender` folder.

## 📝 Available Commands

- `help` - Shows all available commands
- `about` - Displays information about me
- `skills` - Lists my technical skills
- `projects` - Shows my projects
- `contact` - Displays contact information
- `clear` - Clears the terminal
- `lang [pt|en]` - Changes the interface language

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📞 Contact

- GitHub: [jhonatasfender](https://github.com/jhonatasfender)
- LinkedIn: [Jhonatas Fender](https://linkedin.com/in/jhonatasfender)
- Email: [your-email@example.com](mailto:your-email@example.com)
