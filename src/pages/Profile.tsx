import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Container,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { toast } from "sonner";

// Suponemos que tienes una función updateUserProfile en tus servicios
import { updateUserProfile } from "../services/userService"; // Ejemplo

const Input = styled("input")({
  display: "none",
});

export default function Profile() {
  const { user, saveUser } = useContext(UserContext);

  // Estados locales para el formulario
  const [teamName, setTeamName] = useState(user?.teamName || "");
  const [role, setRole] = useState(user?.role || "Auditor de TI");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí tendrías la lógica para subir la imagen y actualizar el perfil
    try {
      // Ejemplo: envía el teamName, role y profilePicture al servidor
      const formData = new FormData();
      formData.append("teamName", teamName);
      formData.append("role", role);
      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }

      // Llamar a un servicio para actualizar el perfil del usuario
      const updatedUser = await updateUserProfile(formData);
      saveUser({ token: "", data: updatedUser }); // Ajusta según cómo manejas el token y usuario
      toast.success("¡Perfil actualizado con éxito!");
    } catch (error: any) {
      console.error(error);
      toast.error("Error al actualizar el perfil. Inténtalo de nuevo.");
    }
  };

  return (
    <Container maxWidth="sm" className="pt-10">
      <Paper className="p-6" elevation={2}>
        <Typography variant="h4" className="mb-6 font-bold">
          Mi Perfil
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          <Box className="flex flex-col items-center gap-4">
            <Avatar
              alt={user?.name || "User"}
              src={user?.profilePicture || ""}
              sx={{ width: 100, height: 100 }}
            />
            <label htmlFor="profile-picture-upload">
              <Input
                accept="image/*"
                id="profile-picture-upload"
                type="file"
                onChange={handleProfilePictureChange}
              />
              <Button variant="outlined" component="span">
                Cambiar foto de perfil
              </Button>
            </label>
          </Box>

          <TextField
            label="Nombre del equipo"
            variant="outlined"
            fullWidth
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <TextField
            label="Rol"
            variant="outlined"
            fullWidth
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <Button variant="contained" color="primary" type="submit">
            Guardar Cambios
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
