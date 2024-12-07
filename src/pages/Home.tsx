import viteLogo from "/vite.svg";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Home() {
  return (
    <main>
      <a href="https://vite.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <h1>AuditFlow</h1>
      <p>Herramienta para auditorias</p>
      <Button
        href="https://github.com/jlac8/front-auditflow"
        target="_blank"
        variant="contained"
        startIcon={<GitHubIcon />}
      >
        Github
      </Button>
      <Button
        href="https://www.linkedin.com/in/juan-luis-alva/"
        target="_blank"
        variant="contained"
        startIcon={<LinkedInIcon />}
      >
        Linkedin
      </Button>
    </main>
  );
}

export default Home;
