import viteLogo from "/vite.svg";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Home() {
  return (
    <main className="flex flex-col items-center justify-center px-6 py-14 text-center space-y-8 ">
      {/* Logo */}
      <a
        href="https://vite.dev"
        target="_blank"
        className="hover:opacity-80 transition-opacity"
      >
        <img src={viteLogo} className="w-32 md:w-40 lg:w-48" alt="Vite logo" />
      </a>

      {/* Título */}
      <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
        ¡Mejora tus recorridos con{" "}
        <span className="text-blue-600">AuditFlow!</span>
      </h1>

      {/* Descripción */}
      <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
        Nuestra solución les brinda a los auditores un formato para trabajar de
        formas más efectiva y que puedan llevar un mejor registro de sus
        recorridos.
      </p>

      {/* Botones */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          href="https://github.com/jlac8/front-auditflow"
          target="_blank"
          variant="contained"
          startIcon={<GitHubIcon />}
          className="bg-gray-800 hover:bg-gray-900 text-white"
        >
          GitHub
        </Button>

        <Button
          href="https://www.linkedin.com/in/juan-luis-alva/"
          target="_blank"
          variant="contained"
          startIcon={<LinkedInIcon />}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          LinkedIn
        </Button>
      </div>
    </main>
  );
}

export default Home;
